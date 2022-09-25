package com.storage.service;

import com.storage.exception.BadRequestException;
import com.storage.exception.ResourceNotFoundException;
import com.storage.model.Activity;
import com.storage.model.Material;
import com.storage.model.Move;
import com.storage.model.MoveCreat;
import com.storage.model.Store;
import com.storage.model.Stored;
import com.storage.model.Use;
import com.storage.model.validation.MoveValidator;
import com.storage.repository.MaterialRepository;
import com.storage.repository.MoveRepository;
import com.storage.repository.StoreRepository;
import com.storage.repository.StoredRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class MoveService {
    MoveRepository moveRepository;
    MoveValidator moveValidator;
    StoredRepository storedRepository;
    StoreRepository storeRepository;
    MaterialRepository materialRepository;

    public List<Move> getMoves(int page, int pageSize) {
        if(page<1){
            throw new BadRequestException("page must be >=1");
        }
        if(pageSize>200){
            throw new BadRequestException("page size too large, must be <=200");
        }
        Pageable pageable = PageRequest.of(page - 1,pageSize);
        return moveRepository.findAll(pageable).toList();
    }

    public Move getMovesById(Long id) {
        Move move = moveRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Worker with id "+id+" does not exists"));
        return move;
    }

    public List<Move> getMoveByIdStoredGive(Long idStored){
        List<Move> moves = moveRepository.findAllByStoredGive_IdStored(idStored);
        return moves;
    }

    public List<Move> getMoveByIdStoredTake(Long idStored){
        List<Move> moves = moveRepository.findAllByStoredTake_IdStored(idStored);
        return moves;
    }
    @Transactional
    public Move postMove(Move move){
        moveValidator.accept(move);
        Stored storedTake = storedRepository.findById(move.getStoredTake().getIdStored())
                .orElseThrow(()->new ResourceNotFoundException("Stored with id "+move.getStoredTake().getIdStored()+" does not exists"));
        Stored storedGive = storedRepository.findById(move.getStoredGive().getIdStored())
                .orElseThrow(()->new ResourceNotFoundException("Stored with id "+move.getStoredGive().getIdStored()+" does not exists"));
        Store storeTake = storedTake.getStore();
        Store storeGiv = storedGive.getStore();
        if (storedTake.getMaterial().getIdMaterial()!=storedGive.getMaterial().getIdMaterial()) {
            throw new ResourceNotFoundException("have to move same materialy, there, first is: "+storedTake.getMaterial().getName()+" second is: "+storedGive.getMaterial().getName());
        }

        if (storedTake.getQuantity()<move.getQuantity()) {
            throw new ResourceNotFoundException("Quantity of "+ storedTake.getMaterial().getName() + " is just " + storedTake.getQuantity()+ " "+ storedTake.getMaterial().getUnit()+", it's not enough");
        }
        storeTake.setActualWeigthKg(storeTake.getActualWeigthKg()-move.getQuantity()*storedTake.getMaterial().getWeightKgUnit());
        storeTake.setActualVolumeM3(storeTake.getActualVolumeM3()-move.getQuantity()*storedTake.getMaterial().getVolumeM3Unit());
        storedTake.setQuantity(storedTake.getQuantity()-move.getQuantity());

        storeGiv.setActualWeigthKg(storeGiv.getActualWeigthKg()+move.getQuantity()*storedGive.getMaterial().getWeightKgUnit());
        storeGiv.setActualVolumeM3(storeGiv.getActualVolumeM3()+move.getQuantity()*storedGive.getMaterial().getVolumeM3Unit());
        storedGive.setQuantity(storedGive.getQuantity()+move.getQuantity());
        if ((storeGiv.getMaxWeigthKg()<storeGiv.getActualWeigthKg())||(storeGiv.getMaxVolumeM3()<storeGiv.getActualVolumeM3())) {
            storeGiv.setBooleanFull(true);
        }

        move.setStoredGive(storedGive);
        move.setStoredTake(storedTake);
        move.setDateMove(LocalDate.now());
        moveRepository.save(move);
        return move;
    }
    @Transactional
    public Move moveStoreToStore(MoveCreat moveCreat){
        Store storeTake = storeRepository.findById(moveCreat.getStoreTake().getIdStore())
                .orElseThrow(()->new ResourceNotFoundException("Store with id "+moveCreat.getStoreTake().getIdStore()+" does not exists"));
        Store storeGive = storeRepository.findById(moveCreat.getStoreGive().getIdStore())
                .orElseThrow(()->new ResourceNotFoundException("Store with id "+moveCreat.getStoreGive().getIdStore()+" does not exists"));
        Material material = materialRepository.findById(moveCreat.getMaterial().getIdMaterial())
                .orElseThrow(()->new ResourceNotFoundException("Material with id "+moveCreat.getMaterial().getIdMaterial()+" does not exists"));
        if (storedRepository.findAllByMaterial_IdMaterialAndStore_IdStore(material.getIdMaterial(),storeTake.getIdStore()).size()<1) {
            Stored newStored = new Stored();
            newStored.setQuantity(0L);
            newStored.setMaterial(material);
            newStored.setStore(storeTake);
            storedRepository.save(newStored);
        }
        if (storedRepository.findAllByMaterial_IdMaterialAndStore_IdStore(material.getIdMaterial(),storeGive.getIdStore()).size()<1) {
            Stored newStored = new Stored();
            newStored.setQuantity(0L);
            newStored.setMaterial(material);
            newStored.setStore(storeGive);
            storedRepository.save(newStored);
        }
        Stored storedTake = storedRepository.findAllByMaterial_IdMaterialAndStore_IdStore(material.getIdMaterial(),storeTake.getIdStore()).get(0);
        Stored storedGive = storedRepository.findAllByMaterial_IdMaterialAndStore_IdStore(material.getIdMaterial(),storeGive.getIdStore()).get(0);
        Move newMove = new Move();
        newMove.setQuantity(moveCreat.getQuantity());
        newMove.setStoredTake(storedTake);
        newMove.setStoredGive(storedGive);
        return postMove(newMove);
    }

}
