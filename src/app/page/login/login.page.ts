import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Storage} from '@ionic/storage'
import { AlertController, MenuController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
  

  loginForm = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private router: Router, private auth: AuthService, private storage: Storage,public menuCtrl: MenuController,private alertController: AlertController) { }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
    this.storage.get("user").then(data =>{
      if(data){
        this.menuCtrl.enable(true);
        this.router.navigateByUrl("inicio");
      }
    });
  }
  ngOnInit() {
  
  }

  singIn(){
    let validateEmail = this.validateEmail(this.loginForm.value.user)   
     this.auth.singIn(this.loginForm.value,validateEmail).then(() =>{
      this.menuCtrl.enable(true);
      let user = this.loginForm.value.user.split('@')
      document.getElementById("headerMenu").insertAdjacentHTML("afterend","<ion-note>"+user[0]+"</ion-note>");
       this.router.navigateByUrl("inicio");
     },(error)=>{
      if(error.code == "auth/user-not-found"){
        this.showAlert("El usuario no existe","Por favor verifique los datos o registrese en la app")
       }
       else if(error.code == "auth/wrong-password")
       {
        this.showAlert("Error","La contraseña es incorrecta")
       }
       else{
        this.showAlert("Error","Hubo un error al iniciar sesión intentelo nuevamente")
       }
     })
  }
  createUser(){
    let validateEmail = this.validateEmail(this.loginForm.value.user)   
    this.auth.createUser(this.loginForm.value,validateEmail).then(() =>{
      this.menuCtrl.enable(true);
      let user = this.loginForm.value.user.split('@')
      document.getElementById("headerMenu").insertAdjacentHTML("afterend","<ion-note>"+user[0]+"</ion-note>");
      this.showAlert("Bienvenido","El usuario se ha creado exitosamente");
    },(error)=>{
      if(error.code == "auth/email-already-in-use"){
        this.showAlert("Usuario registrado","Por favor cambiar el nombre de usuario");
       }
       else{
        this.showAlert("Error","Hubo un error al registrarse intentelo nuevamente")
       }
     });
  }

  validateEmail(cadena:string) {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(cadena)){
     return true;
    } else {
     return false;
    }
  }

  async showAlert(header:string, message:string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      cssClass: 'buttonAlert',

      buttons: [
       {
          text: 'Aceptar',
          cssClass: 'buttonAlert',
          handler: () => {
            this.router.navigateByUrl("inicio");
          }
        }
      ]
    });

    await alert.present();
  }

}
