import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../_core/services/data.service';
import { NgForm } from '@angular/forms';
import $ from "jquery";
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild("registerForm", {static: false}) registerForm: NgForm;

  alert: any;
  statusLogin:boolean=false;
  statusEdit: boolean = false;
  nguoiDung:any;
  listNguoiDung: any = [];
  // name: any;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getListUser();
    this.getLogin();
  }
  
  dangNhap(loginForm){
    const uri = `QuanLyNguoiDung/DangNhap?TaiKhoan=${loginForm.TaiKhoan}&MatKhau=${loginForm.MatKhau}`;
    this.dataService.post(uri).subscribe((data:any) =>{
      if(data === "Tài khoản hoặc mật khẩu không đúng !"){
        this.alert = "Tài khoản hoặc mật khẩu không đúng !";
        $("#modalAlert").modal();     
      }else{
        this.nguoiDung = data;
        this.statusLogin=true;
        localStorage.setItem("userLogin", JSON.stringify(data));
        $('#modalDangNhap').modal( 'hide' ).data( 'bs.modal', null );
      }  
      console.log(data);
       
    })
  }

  dongDangNhap(){
    $('#modalDangNhap').modal( 'hide' ).data( 'bs.modal', null );
  }

  hienDangNhap(){
    $("#modalDangNhap").modal(); 
  }

  dangKy(registerForm){
    const uri = "QuanLyNguoiDung/ThemNguoiDung";
    const objUser ={
      TaiKhoan: registerForm.taiKhoan,
      MatKhau: registerForm.password,
      HoTen: registerForm.HoTen,
      Email: registerForm.email,
      SoDT: registerForm.soDT,
      MaNhom: "GP07",
      MaLoaiNguoiDung: "KhachHang"
    }

    this.dataService.post(uri, objUser).subscribe((data: any) => {
      if(data === "Tài khoản đã tồn tại"){ 
        this.alert = "Tài khoản đã tồn tại";
        $("#modalAlert").modal();   
      }else{
        console.log("dung",data);
        this.alert = "Đăng ký tài khoản thành công";
        $("#modalAlert").modal();   
      }
    });    
    console.log(registerForm);    
  }

  dangXuat(){
    this.statusLogin = false;
    localStorage.removeItem("userLogin");
  }

  loadUser(){
    this.statusEdit = true;
  }

  capNhat(editForm){ 
    let newUser = {
      TaiKhoan: this.nguoiDung.TaiKhoan,
      MatKhau: this.nguoiDung.MatKhau,
      HoTen: editForm.HoTen,
      Email: editForm.Email,
      SoDT: editForm.SoDT,
      MaNhom: "GP07",
      MaLoaiNguoiDung: "KhachHang"
    }
    this.listNguoiDung.map((item) => {
      if(newUser.TaiKhoan === item.TaiKhoan){
        newUser.Email = item.email;
        newUser.HoTen = item.HoTen;
        newUser.SoDT = item.SoDT;
      }
    })
    const uri = `QuanLyNguoiDung/CapNhatThongTin`;
    this.dataService.post(uri, newUser).subscribe((data: any) => {
      $("#modalAlert").modal();     
      $('#modalNguoiDung').modal( 'hide' ).data( 'bs.modal', null );
      this.alert = "Cập nhật người dùng thành công";
    })
  }

  doiMatKhau(changePassForm){
    this.nguoiDung.MatKhau = changePassForm.MatKhauMoi;
    const uri = `QuanLyNguoiDung/CapNhatThongTin`;
    this.dataService.post(uri, this.nguoiDung).subscribe((data: any) => {
      $("#modalAlert").modal();     
      $('#modalDoiMatKhau').modal( 'hide' ).data( 'bs.modal', null );
      this.alert = "Cập nhật mật khẩu thành công";
      localStorage.setItem("userLogin", JSON.stringify(this.nguoiDung));
    })
  }

  getLogin(){
    if(localStorage.getItem("userLogin") != null){
      this.statusLogin= true;
      this.nguoiDung = JSON.parse(localStorage.getItem("userLogin"));  
    }
  }

  getListUser(){
    const uri = `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP07`;
    this.dataService.get(uri).subscribe((data: any) => {
      this.listNguoiDung = data;
      console.log(this.listNguoiDung, "list");    
    })
  }
}
