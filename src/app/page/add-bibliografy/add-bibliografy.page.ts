import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FireBaseService } from 'src/app/services/fire-base.service';


@Component({
  selector: 'app-add-bibliografy',
  templateUrl: './add-bibliografy.page.html',
  styleUrls: ['./add-bibliografy.page.scss'],
})
export class AddBibliografyPage implements OnInit {

  bibliografyForm: FormGroup 

  constructor(  private route: ActivatedRoute,
    private router: Router, private fireBase:FireBaseService, private toast: ToastController) { 
      
    }

  ngOnInit() {
    this.bibliografyForm = new FormGroup({
      idreferencia: new FormControl('', [Validators.required, Validators.min(1)]),
      titulopub: new FormControl('', Validators.required),
      autores: new FormControl('', Validators.required),
      tipopub: new FormControl('', Validators.required),
      eventorevista: new FormControl(''),
      doi: new FormControl(''),
      anyopub: new FormControl('', [Validators.required, Validators.min(1)]),
    });
  }
  crearBibliografia()
  {
    this.fireBase.getRefence().then(()=>
    {
      this.fireBase.getBibliografy(this.bibliografyForm.value.idreferencia.toString()).subscribe(bibliografy =>{
        if(bibliografy == undefined){
          this.fireBase.addBibliografy(this.bibliografyForm.value).then(() =>
          {
            this.showToast("Se ha creado la bibliografia exitosamente");
            this.bibliografyForm.reset();
             this.router.navigateByUrl("/inicio");  
          }).catch(function(error) {
            this.showToast("Ocurriedo un error al crear la bibliografia:"+ error);
   });
        }
        else{
          this.showToast("La bibliografia con ese identificador ya existe</br>Ingrese otro identificador");
        }
      },(error) => {
          this.showToast("Ocurriedo un error al buscar la bibliografia:"+ error);
        });
    });

  }
  async showToast(msg:string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      cssClass: 'toast',

    });
    toast.present();
  }

}
