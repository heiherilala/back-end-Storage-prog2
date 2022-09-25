package com.storage.controller;

import com.storage.controller.mapper.WorkerMapper;
import com.storage.model.Worker;
import com.storage.service.WorkerService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor

public class WorkerController {
    private WorkerService workerService;
    private WorkerMapper workerMapper;

    @GetMapping("/workers")
    public List<Worker> getWorkers(@RequestParam int page,
                                   @RequestParam(value = "page_size") int pageSize,
                                   @RequestParam(value = "first_name",required = false , defaultValue = "") String firstName,
                                   @RequestParam(value = "last_name",required = false , defaultValue = "") String lastName){
        return workerService.getWorkers(page, pageSize, firstName, lastName)
                .stream()
                .map(workerMapper::toRestWorker)
                .toList();
    }

    @PostMapping("/workers")
    public Worker addWorker(@Valid @RequestBody Worker Worker){
        return workerService.addWorker(Worker);
    }

    @GetMapping("/workers/{id}")
    public Worker getWorkerById(@PathVariable Long id) throws Exception {
        return workerService.getWorkerById(id);
    }

    @DeleteMapping("/workers/{id}")
    public Worker deleteWorkerById(@PathVariable Long id) throws Exception {
        return workerService.deleteWorkerById(id);
    }

    @PutMapping("/workers/{id}")
    public Worker modifyWorkerById(@PathVariable Long id,@Valid @RequestBody Worker newWorker) throws Exception {
        return workerMapper.toRestWorker(workerService.putModificationWorkerById(id, newWorker));
    }


}
