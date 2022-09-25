package com.storage.service;

import com.storage.exception.BadRequestException;
import com.storage.exception.ResourceNotFoundException;
import com.storage.model.*;
import com.storage.model.validation.UseValidator;
import com.storage.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class UseService {
    UseRepository useRepository;
    UseValidator useValidator;
    ActivityRepository activityRepository;
    StoredRepository storedRepository;
    StoreRepository storeRepository;
    MaterialRepository materialRepository;



    public List<Use> getUses(int page, int pageSize) {
        if(page<1){
            throw new BadRequestException("page must be >=1");
        }
        if(pageSize>200){
            throw new BadRequestException("page size too large, must be <=200");
        }
        Pageable pageable = PageRequest.of(page - 1,pageSize);
        return useRepository.findAll(pageable).toList();
    }

    public Use getUsesById(Long id) {
        Use use = useRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Worker with id "+id+" does not exists"));
        return use;
    }

    public List<Use> getUseByIdStored(Long idStored){
        List<Use> uses = useRepository.findAllByStored_IdStored(idStored);
        return uses;
    }

    public List<Use> getUseByIdActivity(Long idActivity){
        List<Use> uses = useRepository.findAllByActivity_IdActivity(idActivity);
        return uses;
    }
    @Transactional
    public Use postUse(Use use){
        useValidator.accept(use);
        Stored stored = storedRepository.findById(use.getStored().getIdStored())
                .orElseThrow(()->new ResourceNotFoundException("Stored with id "+use.getStored().getIdStored()+" does not exists"));
        Activity activity = activityRepository.findById(use.getActivity().getIdActivity())
                .orElseThrow(()->new ResourceNotFoundException("Activity with id "+use.getActivity().getIdActivity()+" does not exists"));
        Store store = stored.getStore();
        if (stored.getQuantity()<use.getQuantity()) {
            throw new ResourceNotFoundException("Quantity of "+ stored.getMaterial().getName() + " is just " + stored.getQuantity()+ " "+ stored.getMaterial().getUnit()+", it's not enough");
        };
        store.setActualWeigthKg(store.getActualWeigthKg()-use.getQuantity()*stored.getMaterial().getWeightKgUnit());
        store.setActualVolumeM3(store.getActualVolumeM3()-use.getQuantity()*stored.getMaterial().getVolumeM3Unit());
        stored.setQuantity(stored.getQuantity()-use.getQuantity());
        use.setActivity(activity);
        use.setStored(stored);
        use.setDateUse(LocalDate.now());
        useRepository.save(use);
        return use;
    }


    @Transactional
    public Use postUseByMaterial(UseCreat useCreat){
        Activity activityById = activityRepository.findById(useCreat.getActivity().getIdActivity())
                .orElseThrow(()->new ResourceNotFoundException("Activity with id "+useCreat.getActivity().getIdActivity()+" does not exists"));
        Material materialById = materialRepository.findById(useCreat.getMaterial().getIdMaterial())
                .orElseThrow(()->new ResourceNotFoundException("Material with id "+useCreat.getMaterial().getIdMaterial()+" does not exists"));
        Store storeById = storeRepository.findById(useCreat.getStore().getIdStore())
                .orElseThrow(()->new ResourceNotFoundException("Store with id "+useCreat.getStore().getIdStore()+" does not exists"));
        if (storedRepository.findAllByMaterial_IdMaterialAndStore_IdStore(materialById.getIdMaterial(),storeById.getIdStore()).size()<1) {
            Stored newStored = new Stored();
            newStored.setQuantity(0L);
            newStored.setMaterial(materialById);
            newStored.setStore(storeById);
            storedRepository.save(newStored);
        }
        Stored storedTake = storedRepository.findAllByMaterial_IdMaterialAndStore_IdStore(materialById.getIdMaterial(),storeById.getIdStore()).get(0);
        Use newUse = new Use();
        newUse.setQuantity(useCreat.getQuantity());
        newUse.setStored(storedTake);
        newUse.setActivity(activityById);
        return postUse(newUse);
    }
}
