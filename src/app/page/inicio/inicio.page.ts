import { Component, OnInit } from '@angular/core';
import { FireBaseService} from "src/app/services/fire-base.service"
import { AlertController, LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  private bibliografys;

  constructor(private alertController: AlertController, private toast: ToastController,private fireBase:FireBaseService,private loadingController: LoadingController
    ) { }

   async ngOnInit() {

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando Bibliografias...',
    });
    await loading.present();
     this.fireBase.getRefence().then(()=>
      {
        this.bibliografys = this.fireBase.getBibliografys();
        loading.dismiss();
      });
  }
  
  async alertDelete(idBibliograya: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: 'Esta seguro que desea eliminar la bibliografia?',
      cssClass: 'buttonAlert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Aceptar',
          cssClass: 'aceptar',

          handler: () => {
            this.deleteBibliografy(idBibliograya.toString());
          }
        }
      ]
    });

    await alert.present();
  }
  deleteBibliografy(idBibliograya: string)
  {
    this.fireBase.deleteBibliografy(idBibliograya).then(()=>
    {
      this.showToast("Se elimino la bibligorafia existosamente");
    },(error) => {
      this.showToast("Ocurriedo un error al eliminar la bibliografia:"+ error);
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
