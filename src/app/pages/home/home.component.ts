import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { GQrService } from 'src/app/services/g-qr.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value:string = ''
  formGroup: FormGroup;
  fechaActual:Date = new Date()
  fechaManana:Date = new Date()
  businessNameValue:boolean = false
  nameValue:boolean = false
  descriptionValue:boolean = false
  quantityOfScansValue:boolean = false
  expirationValue:boolean = false
  buttonDisabled:boolean = false

  constructor( private formBuilder: FormBuilder, private gQrService:GQrService) {

    this.formGroup = this.formBuilder.group(
      {
          businessName: [, [Validators.required]],
          name: [, [Validators.required]],
          description: [, [Validators.required]],
          quantityOfScans: [, [Validators.required]],
          expiration: [, [Validators.required]],
      })
   }

  ngOnInit(): void {
    this.fechaManana.setDate(this.fechaActual.getDate() + 1);

    this.formGroup.get('businessName')?.valueChanges.subscribe( resp => {
      if(resp.trim().length > 0) {
        this.businessNameValue = true
      }else {
        this.businessNameValue = false
        this.resetName()
      }
    })

    this.formGroup.get('name')?.valueChanges.subscribe( resp => {
      if(resp.trim().length > 0) {
        this.nameValue = true
      }else {
        this.nameValue = false
        this.resetDescription()
      }
    })

    this.formGroup.get('description')?.valueChanges.subscribe( resp => {
      if(resp.trim().length > 0) {
        this.descriptionValue = true
      }else {
        this.descriptionValue = false
        this.resetQuantityOfScans()
      }
    })

    this.formGroup.get('quantityOfScans')?.valueChanges.subscribe( resp => {
      console.log(resp)
      if(resp > 0) {
        this.quantityOfScansValue = true
      }else {
        this.quantityOfScansValue = false
        this.resetExpiration()
      }
    })

    this.formGroup.get('expiration')?.valueChanges.subscribe( resp => {
      if(resp) {
        this.expirationValue = true
      }else {
        this.expirationValue = false
      }
    })

  }

  home(){
    this.value='c'
    this.formGroup.patchValue({businessName:'', name:'',description: '', quantityOfScans: '', expiration: '' });
    this.enableForm()
    this.buttonDisabled = false
  }

  resetName() {
    this.formGroup.patchValue({ name: '' });
  }

  resetDescription() {
    this.formGroup.patchValue({ description: '' });
  }

  resetQuantityOfScans() {
    this.formGroup.patchValue({ quantityOfScans: '' });
  }

  resetExpiration() {
    this.formGroup.patchValue({ expiration: '' });
  }

  blockForm(){
    this.formGroup.disable()
  }

  enableForm(){
    this.formGroup.enable()
  }

  GenerarQr(){
    let body = this.formGroup.value
    this.value='c'
    this.gQrService.postPromotion(body).subscribe(resp => {
      this.value = `https://demo-qr-app-front.vercel.app/Promo/${resp._id}`
      this.blockForm()
      this.buttonDisabled = true
    }, (err)=> {
      console.log(err.error.message)
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: err.error.message,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    })
  }
}
