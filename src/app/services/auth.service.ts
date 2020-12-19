import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage} from '@ionic/storage'
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FireBaseService } from './fire-base.service';

export interface auth{
  user:string,
  password:string
}
const TOKEN_KEY = "user";
@Injectable({
  providedIn: 'root'
})


export class AuthService {
  user: Observable<any>;
  
  private authState = new BehaviorSubject(null);
  constructor(private router: Router ,public angularFire: AngularFireAuth, private storage: Storage ,  private firebase: FireBaseService) {
    this.loadUser();
    
    this.user = this.authState.asObservable().pipe(
      filter(response => response)
    );
   }
  
  singIn(user:auth,validateEmail:boolean  )
  {
    if(!validateEmail) user.user += "@gmail.com"
    return this.angularFire.signInWithEmailAndPassword(user.user,user.password).then(()=>{    
      this.authState.next(user);
      this.storage.set(TOKEN_KEY,user);
    });
  }
  createUser(user:auth,validateEmail:boolean ){
    if(!validateEmail) user.user += "@gmail.com"
    return this.angularFire.createUserWithEmailAndPassword(user.user, user.password).then(()=>{ 
      this.authState.next(user);
      this.storage.set(TOKEN_KEY,user);
    });;
}
  loadUser(){
     return this.storage.get(TOKEN_KEY).then(data =>{
        if(data)
        {
          let user = data.user.split('@')
          document.getElementById("headerMenu").insertAdjacentHTML("afterend","<ion-note>"+user[0]+"</ion-note>");

          this.authState.next(data)
        }
        else{
          this.authState.next({user : null, password: null});
        }
     })
  }

  async logOut(){
    this.angularFire.signOut();
    await this.storage.set(TOKEN_KEY,null);
    this.authState.next(null)
    window.location.replace('/');
  }
}
