package main

import (
	"encoding/json"
	"log"
	"net/http"
	"fmt"
	"io/ioutil"
	"strings"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"

	"github.com/rs/cors"

	_ "github.com/jinzhu/gorm/dialects/postgres"
)

//User : user model
type User struct { 
	gorm.Model
	UserID int 
	Username string
	Password string
	Email string
}

//UserJSON : user model
type UserJSON struct {
	Username string
	Email string
	Password string
  }

var db *gorm.DB
var err error

func main() {
	router := mux.NewRouter()
	db,err = gorm.Open( "postgres", "port=5432 user=vishwas dbname=chess-game sslmode=disable password=Bolerocar")
  	if err != nil {
		fmt.Printf("failed to connect to databse\n")

    //panic("failed to connect database")
	  }
	defer db.Close()
	db.AutoMigrate(&User{})
	

	router.HandleFunc("/users", GetUsers).Methods("GET")
	router.HandleFunc("/user/{id}",GetUser).Methods("GET")
	router.HandleFunc("/users/add",CreateUser).Methods("POST")

	handler := cors.Default().Handler(router)
	log.Fatal(http.ListenAndServe(":8080", handler))
}


func formatRequest(r *http.Request) string{

	var request []string
	url := fmt.Sprintf("%v %v %v", r.Method, r.URL, r.Proto)
	request = append(request, url)
	request = append(request, fmt.Sprintf("Host: %v", r.Host))
	// Loop through headers
	for name, headers := range r.Header {
		name = strings.ToLower(name)
		for _, h := range headers {
			request = append(request, fmt.Sprintf("%v: %v", name, h))
		}
	}
	
	if r.Method == "POST" {
		r.ParseForm()
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			panic(err)
		}
		request = append(request,fmt.Sprintf("body: %v", body))
		request = append(request, "\n")
		request = append(request, r.Form.Encode())
	} 

	return strings.Join(request,"\n")
}

//GetUsers : returns users from db
func GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []User
	db.Find(&users)
	json.NewEncoder(w).Encode(&users)
}

//CreateUser : creates new user
func CreateUser(w http.ResponseWriter, r *http.Request){
	//print(formatRequest(r))
	var result map[string]string
	error1 := json.NewDecoder(r.Body).Decode(&result)
	fmt.Println("r1",result,error1)
	var newUser User = User{ UserID: 10, Username: result["Username"], Password: result["Password"], Email: result["Email"] };
	db.Create(&newUser)
}



//GetUser : returns one user from db based on id
func GetUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var user User
	db.First(&user, params["User_id"])
	json.NewEncoder(w).Encode(&user)
}




