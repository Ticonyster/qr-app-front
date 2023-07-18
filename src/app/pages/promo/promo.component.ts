import { Component, Inject , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { GQrService } from 'src/app/services/g-qr.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss'],
  providers: [
    { provide: DOCUMENT, useValue: document }
    // Otros proveedores
  ],
})
export class PromoComponent implements OnInit {
  reclamar:boolean = true
  idPromo!:string
  promo:any
  NotexistPromo:any

  linkVisited:boolean = false
  constructor(private gQrService:GQrService, private ActivateRoute: ActivatedRoute, private router:Router,
    @Inject(DOCUMENT) private document: Document)  { }

  ngOnInit(): void {
    this.ActivateRoute.params.subscribe({
      next: ({ id }) => {
        this.idPromo = id
        this.getPromoById(this.idPromo)

      }
    });
  }





  getPromoById(id:string){
    this.gQrService.GetById(id).subscribe({
      next: (resp) => {
        this.promo = resp
        this.linkVisited = this.checkCookieExists(this.promo.name);
        if(this.linkVisited){
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: "Ya has reclamado esta promoción",
            timer: 6000,
            timerProgressBar: true,
            allowOutsideClick:false,
            allowEscapeKey:false,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              this.router.navigateByUrl('/')
            }

            if (result.isConfirmed) {
              this.router.navigateByUrl('/')
            }
          })
        }
      },
      error: (error) => {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: error.error.message,
          timer: 8000,
          timerProgressBar: true,
          allowOutsideClick:false,
          allowEscapeKey:false,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        }).then((result) => {
          console.log('pasando')
          if (result.dismiss === Swal.DismissReason.timer) {
            this.router.navigateByUrl('/')
          }
          if (result.isConfirmed) {
            this.router.navigateByUrl('/')
          }
        })
      }
    })
  }

  claim(id:string){
    this.gQrService.PostById(id).subscribe(resp=> {
      this.reclamar = false
      this.promo = resp
      const {businessName, name, quantityOfScansLimit, description } = this.promo
      Swal.fire({
        icon: 'success',
        title: '¡Muy bien!',
        html:
        `¡Has reclamado la promoción!<br/>` +
        `Utiliza el siguiente código y dirígete hacia el establecimiento ${businessName} para canjear la promoción: <br/>` +
        `Código: ${name} - ${quantityOfScansLimit}<br/>` +
        `Descripción: ${description}<br/>`+
        `<span>Recuerda tomarle capture 😎</span>`,
        allowOutsideClick:false,
        allowEscapeKey:false,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          this.router.navigateByUrl('/')
        }

        if (result.isConfirmed) {
          this.router.navigateByUrl('/')
        }
      })
      this.setLinkVisitedCookie(this.promo.name)
    })
  }

  checkCookieExists(cookieName: string): boolean {
    const cookies = this.document.cookie.split(';');
    return cookies.some(cookie => cookie.trim().startsWith(cookieName + '='));
  }

  setLinkVisitedCookie(cookieName: string) {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    this.document.cookie = cookieName + '=true; expires=' + expirationDate.toUTCString();
  }

  home(){
    this.router.navigateByUrl('/')
  }

}
