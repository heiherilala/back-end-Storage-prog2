package com.storage.controller;

import com.storage.model.Move;
import com.storage.model.MoveCreat;
import com.storage.model.Use;
import com.storage.service.MoveService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@AllArgsConstructor
public class MoveController {
    private MoveService moveService;
    @GetMapping("/moves")
    public List<Move> getAllMoves(@RequestParam int page,
                                     @RequestParam(value = "page_size") int pageSize){
        return moveService.getMoves(page, pageSize);
    }

    @GetMapping("/moves/{id}")
    public Move getMoveById(@PathVariable Long id) throws Exception {
        return moveService.getMovesById(id);
    }

    @PostMapping("/moves")
    public Move addMove(@Valid @RequestBody Move move){
        return moveService.postMove(move);
    }

    @PostMapping("/moves/by-store")
    public Move addMoveByStore(@Valid @RequestBody MoveCreat moveCreat){
        return moveService.moveStoreToStore(moveCreat);
    }




}
