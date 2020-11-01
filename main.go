package main

import (
	"encoding/json"
	"log"
	"net/http"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"

	"github.com/rs/cors"

	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type User struct {
	gorm.Model
	User_id int
	Username string
	Password string
	Email string
}

var db *gorm.DB
var err error
var ( users = []User{

	{User_id:1, Username: "noobmaster45", Password:"test1231sd", Email:"testemail123@fake.com"},

	{User_id:2, Username: "purplesus23",  Password:"test1231sd",Email:"testema23@fake2.com"},

	{User_id:3, Username: "penguinclap12",  Password:"test1231sd",Email:"tail123@fake4.com"},

})
func main() {
	fmt.Printf("hello world\n")
	router := mux.NewRouter()
	db,err = gorm.Open( "postgres", "port=5432 user=vishwas dbname=chess-game sslmode=disable password=Bolerocar")
  	if err != nil {
		fmt.Printf("failed to connect to databse\n")

    //panic("failed to connect database")
	  }
	defer db.Close()
	db.AutoMigrate(&User{})
	
	for index:= range users{
		db.Create(&users[index])
		fmt.Print("succes");
	}

	router.HandleFunc("/users", GetUsers).Methods("GET")
	router.HandleFunc("user/{id}",GetUser).Methods("GET")

	handler := cors.Default().Handler(router)
	log.Fatal(http.ListenAndServe(":8080", handler))
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []User
	db.Find(&users)
	json.NewEncoder(w).Encode(&users)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var user User
	db.First(&user, params["User_id"])
	json.NewEncoder(w).Encode(&user)
}



