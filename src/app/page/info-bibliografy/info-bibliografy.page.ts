import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FireBaseService } from 'src/app/services/fire-base.service';

@Component({
  selector: 'app-info-bibliografy',
  templateUrl: './info-bibliografy.page.html',
  styleUrls: ['./info-bibliografy.page.scss'],
})
export class InfoBibliografyPage implements OnInit {

  private bibliografy;
  private id:string;
  private bibliografyForm: FormGroup;


  constructor(private fireBase:FireBaseService, private route: ActivatedRoute, private toast: ToastController, private router: Router,private formBuilder: FormBuilder) { 
    this.bibliografyForm = this.formBuilder.group({
      idreferencia: [null, [Validators.required, Validators.min(0)]],
      titulopub: [null, Validators.required],
      autores: [null, Validators.required],
      tipopub: [null, Validators.required],
      eventorevista: [null],
      doi: [null ],
      anyopub: [null, [Validators.required, Validators.min(1)] ]
    });
  }
  ngOnInit() {
     this.id = this.route.snapshot.paramMap.get('id');
     this.fireBase.getRefence().then(()=>
      {
        this.fireBase.getBibliografy(this.id).subscribe(bibliografy =>{
          this.bibliografy = bibliografy;
          if(this.bibliografy == undefined){
            this.router.navigateByUrl("/inicio");  
          }
          this.bibliografyForm.setValue(bibliografy);         
        });
      });
  }
  updateBibliografy()
  {
    this.fireBase.updateBibliografy(this.bibliografyForm.value).then(()=>
    {
      this.showToast("Se modifico la bibligorafia existosamente");
      this.router.navigateByUrl("/inicio");  

    },(error) => {
      this.showToast("Ocurriedo un error al modificar la bibliografia:"+ error);
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
