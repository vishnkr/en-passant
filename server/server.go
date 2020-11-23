package main

import (
	//"encoding/json"
	"log"
	"net/http"
	"fmt"
	"os"
	//"io/ioutil"
	//"strings"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	//routes "github.com/vishnkr/en-passant/server/src/routes"
	"github.com/vishnkr/en-passant/server/src/models"
	"github.com/vishnkr/en-passant/server/src/controller"
	"github.com/rs/cors"
	"github.com/joho/godotenv"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

//App : app struct
type App struct {
	Router *mux.Router
	DB     *gorm.DB
}

//RequestHandlerFunction : 
type RequestHandlerFunction func(db *gorm.DB, w http.ResponseWriter, r *http.Request)

//handleRequest : handle request
func (a *App) handleRequest(handler RequestHandlerFunction) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		handler(a.DB, w, r)
	}
}

//Initialize : initialize db orm and router
func (a *App) Initialize(){
	var db *gorm.DB
	var err error
	fmt.Printf("reached\n")
	envErr := godotenv.Load(".env")
	if envErr != nil {
		log.Fatalf("Error loading .env file")
	  }
	var dbString = fmt.Sprintf("port=%v user=%v dbname=%v sslmode=disable password=%v",os.Getenv("DB_PORT"),os.Getenv("DB_USERNAME"),os.Getenv("DB_NAME"),os.Getenv("DB_PASSWORD"))
	db,err = gorm.Open( "postgres", dbString)
  	if err != nil {
		fmt.Printf("failed to connect to databse\n")

    //panic("failed to connect database")
	  }
	a.DB = model.DBMigrate(db)
	a.Router = mux.NewRouter()
	a.setRouters()
}//config)

//Get : get wrapper
func (a *App) Get(path string, f func(w http.ResponseWriter,r *http.Request)){
	a.Router.HandleFunc(path, f).Methods("GET")
}

//Post : post wrapper
func (a *App) Post(path string, f func(w http.ResponseWriter,r *http.Request)){
	a.Router.HandleFunc(path, f).Methods("POST")
}

//Run : run on port
func (a *App) Run (port string){
	handler := cors.Default().Handler(a.Router)
	log.Fatal(http.ListenAndServe(port, handler))
}

func (a *App) setRouters() {
	a.Get("/", a.handleRequest(controller.Welcome))
	a.Get("/users", a.handleRequest(controller.GetUsers))
	a.Get("/user/{id}",a.handleRequest(controller.GetUser))
	a.Post("/login",a.handleRequest(controller.HandleLogin))
	a.Post("/users/add",a.handleRequest(controller.CreateUser))
	
	/*
	// Routing for handling the projects
	a.Get("/projects", a.handleRequest(handler.GetAllProjects))
	a.Post("/projects", a.handleRequest(handler.CreateProject))
	a.Get("/projects/{title}", a.handleRequest(handler.GetProject))
	a.Put("/projects/{title}", a.handleRequest(handler.UpdateProject))
	a.Delete("/projects/{title}", a.handleRequest(handler.DeleteProject))
	a.Put("/projects/{title}/archive", a.handleRequest(handler.ArchiveProject))
	a.Delete("/projects/{title}/archive", a.handleRequest(handler.RestoreProject))

	// Routing for handling the tasks
	a.Get("/projects/{title}/tasks", a.handleRequest(handler.GetAllTasks))
	a.Post("/projects/{title}/tasks", a.handleRequest(handler.CreateTask))
	a.Get("/projects/{title}/tasks/{id:[0-9]+}", a.handleRequest(handler.GetTask))
	a.Put("/projects/{title}/tasks/{id:[0-9]+}", a.handleRequest(handler.UpdateTask))
	a.Delete("/projects/{title}/tasks/{id:[0-9]+}", a.handleRequest(handler.DeleteTask))
	a.Put("/projects/{title}/tasks/{id:[0-9]+}/complete", a.handleRequest(handler.CompleteTask))
	a.Delete("/projects/{title}/tasks/{id:[0-9]+}/complete", a.handleRequest(handler.UndoTask))
	*/
}

func main() {
	app := &App{}
	app.Initialize()
	app.Run(":8080")
	
}

/*

func welcome(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "Welcome to En Passant Backend")
	
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
func GetUser(w http.ResponseWriter, r *http.Request){
	params := mux.Vars(r)
	var user User

	db.First(&user, params["User_id"])
	json.NewEncoder(w).Encode(&user)
}

//HandleLogin : function to handle login
func HandleLogin(w http.ResponseWriter, r *http.Request){
	//params := mux.Vars(r)
	var user User
	var result map[string]string
	//json.NewEncoder(w).Encode(&user)
	err := json.NewDecoder(r.Body).Decode(&result)
	if (err !=nil){
		fmt.Print("failed lol")
	}
	var match bool = true
	db.First(&user,"Username=?",result["Username"])//, 
	//db.Find(&user,params["Username="+result["Username"]])
	fmt.Print("res- ",result," \n",user.Username)
		if result["Username"]!=user.Username || result["Password"]!=user.Password{
			fmt.Print(result,user)
			match = false
		}
	json.NewEncoder(w).Encode(match)
}
*/




