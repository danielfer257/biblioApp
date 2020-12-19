import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map,  take } from 'rxjs/operators';
import { Storage} from '@ionic/storage'
import { AngularFireAuth } from '@angular/fire/auth';

export interface bibliografy{
  idreferencia:number,
  titulopub:string,
  autores:string,
  tipopub:number,
  eventorevista?:string,
  doi?:string,
  anyopub:number
}


@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  private bibliografys: Observable<any>;
  private bibliografysCollection: AngularFirestoreCollection<bibliografy>;
  constructor(private db: AngularFirestore, public angularFire: AngularFireAuth,private storage: Storage) { }


  async getRefence()
  {
    if(this.bibliografysCollection == undefined)
    {
      let user = await this.storage.get("user");
      var collection = 'usuarios/'+user.user+'/bibliografys';
      return this.bibliografysCollection = this.db.collection(collection);
    }
    else{
      return this.bibliografysCollection;
    }
  }

  addBibliografy(bibliografy:bibliografy){
     return this.bibliografysCollection.doc(bibliografy.idreferencia.toString()).set(bibliografy);
  }

  getBibliografys(){   
      this.bibliografys =this.bibliografysCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as bibliografy;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
     return this.bibliografys;  
  }
  getBibliografy(id:string): Observable<bibliografy>
  {
    return this.bibliografysCollection.doc<bibliografy>(id).valueChanges().pipe(
      take(1),
      map(bibliografy => {
        return bibliografy
      })
    );
  }
  updateBibliografy(bibliografy:bibliografy): Promise<void>{
    return this.bibliografysCollection.doc<bibliografy>(bibliografy.idreferencia.toString()).update(bibliografy);

  }
  deleteBibliografy(id:string): Promise<void>
  {
    return this.bibliografysCollection.doc<bibliografy>(id).delete();
  }
  
}
