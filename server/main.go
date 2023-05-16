package main

import (
	"fmt"
	"log"
	"net/http"
	"taokhan/golang-react-to-do/router"
)

func main() {
	r := router.Router()
	fmt.Println("Server is running on port 9000...")

	http.ListenAndServe(":9000", r)
	log.Fatal(http.ListenAndServe(":9000", r))

}
