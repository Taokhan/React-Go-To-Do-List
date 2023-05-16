package router

import (
	"taokhan/golang-react-to-do/middleware"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/task", middleware.GetAllTask).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/tasks", middleware.CreateTask).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/taskUpdate", middleware.UpdateStatus).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/taskEdit", middleware.EditTask).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/taskDelete{id}", middleware.DeleteTask).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/deleteAllTasks", middleware.DeleteAllTasks).Methods("DELETE", "OPTIONS")

	return router
}
