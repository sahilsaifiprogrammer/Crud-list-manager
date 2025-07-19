

	package com.example.controller;

	import com.example.model.Task;
	import com.example.repository.TaskRepository;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.web.bind.annotation.*;

	import java.util.List;

	@RestController
	@RequestMapping("/api/tasks")
	@CrossOrigin(origins = "http://localhost:63342")
	public class TaskController {
	    @Autowired
	    private TaskRepository taskRepository;

	    @GetMapping
	    public List<Task> getAllTasks() {
	        return taskRepository.findAll();
	    }

	    @PostMapping
	    public Task createTask(@RequestBody Task task) {
	        return taskRepository.save(task);
	    }

	    @DeleteMapping("/{id}")
	    public void deleteTask(@PathVariable Long id) {
	        taskRepository.deleteById(id);
	    }
	    @PutMapping("/{id}")
	    public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
	        Task task = taskRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Task not found"));
	        task.setDescription(taskDetails.getDescription());
	        task.setCompleted(taskDetails.isCompleted());
	        return taskRepository.save(task);
	    }
	}

