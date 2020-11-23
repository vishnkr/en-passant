package controller

import (
	"encoding/json"
	"net/http"
	"fmt"
	//"strings"
	//"io/ioutil"
	"github.com/jinzhu/gorm"
	//"github.com/rs/cors"
	"github.com/gorilla/mux"
	//import for postgres gorm
	_ "github.com/jinzhu/gorm/dialects/postgres")

var db *gorm.DB
var err error
//User : user model
type User struct { 
	gorm.Model
	UserID int 
	Username string
	Password string
	Email string
}
//Welcome : welcome message
var Welcome = func (db *gorm.DB,w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "Welcome to En Passant Backend")
}


//GetUsers : returns users from db
var GetUsers = func (db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	fmt.Printf("reashdce boi")
	var users []User
	db.Find(&users)
	json.NewEncoder(w).Encode(&users)
}

//CreateUser : creates new user
var CreateUser = func (db *gorm.DB,w http.ResponseWriter, r *http.Request){
	//print(formatRequest(r))
	var result map[string]string
	error1 := json.NewDecoder(r.Body).Decode(&result)
	fmt.Println("r1",result,error1)
	var newUser User = User{ UserID: 10, Username: result["Username"], Password: result["Password"], Email: result["Email"] };
	db.Create(&newUser)
}


//GetUser : returns one user from db based on id
var GetUser = func (db *gorm.DB,w http.ResponseWriter, r *http.Request){
	params := mux.Vars(r)
	var user User

	db.First(&user, params["User_id"])
	json.NewEncoder(w).Encode(&user)
}

//HandleLogin : function to handle login
var HandleLogin = func (db *gorm.DB,w http.ResponseWriter, r *http.Request){
	//params := mux.Vars(r)
	var user User
	var result map[string]string
	//json.NewEncoder(w).Encode(&user)
	err := json.NewDecoder(r.Body).Decode(&result)
	if (err !=nil){
		fmt.Print("failed lol")
	}
	var match bool = true
	fmt.Print("login")
	db.First(&user,"Username=?",result["Username"])//, 
	//db.Find(&user,params["Username="+result["Username"]])
	fmt.Print("res- ",result," \n",user.Username)
		if result["Username"]!=user.Username || result["Password"]!=user.Password{
			fmt.Print(result,user)
			match = false
		}
	json.NewEncoder(w).Encode(match)
}