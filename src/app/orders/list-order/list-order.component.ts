import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NewproductService } from 'src/app/services/newproduct.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {
  addOrderForm: FormGroup | any;
  actionButton: string = "Add Order";
  editSet: any = [];
  closeResult: string | any;
  ordersList: any = [];
  displayedColumns: string[] = ['Order No', 'Due Date', 'Customer Name', 'Address', 'mobile', 'Order Total', 'Actions'];
  dataSource!: MatTableDataSource<any>;
  val: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  flag: boolean = false;
  id: any;
  constructor(public datepipe: DatePipe, private formBuilder: FormBuilder, private modelService: NgbModal, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog, private service: NewproductService) {
  }

  ngOnInit(): void {
    this.getAllOrders();
    this.addOrderForm = this.formBuilder.group({
      id: [''],
      dueDate: ['', [Validators.required]],
      fullName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      address: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern("(0|91)?[6-9][0-9]{9}")]],
      orderTotal: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    })


  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    this.snackBar.open("logged out successfully", 'OK', { duration: 2000, verticalPosition: 'top', panelClass: ['green-snackbar'] });
  }

  getAllOrders() {
    this.service.getAllProducts().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
      }
    })
  }
  delete(content: any, id: any) {
    this.id = id;
    this.modelService.open(content);
  }

  open(content: any, editData: any) {
    this.editSet = editData;
    if (!editData == false) {
      this.actionButton = 'Update Order';
      let latest_date = this.datepipe.transform(this.editSet.dueDate, 'yyyy-MM-dd');
      this.addOrderForm.controls['dueDate'].setValue(latest_date)
      this.addOrderForm.controls['fullName'].setValue(this.editSet.fullName),
        this.addOrderForm.controls['address'].setValue(this.editSet.address),
        this.addOrderForm.controls['mobile'].setValue(this.editSet.mobile),
        this.addOrderForm.controls['orderTotal'].setValue(this.editSet.orderTotal)
      this.modelService.open(content,{size:'lg'});
    }
    else {
      this.actionButton = 'Add Order';
      this.addOrderForm.reset();
      this.modelService.open(content,{size:'lg'});
    }
  }

  get f() {
    return this.addOrderForm.controls;
  }

  confirm() {
    this.service.deleteOrder(this.id).subscribe({
      next: (res) => {
        this.snackBar.open("Order Deleted Successfully", 'OK', { duration: 2000, verticalPosition: 'top', panelClass: ['green-snackbar'] });
        this.getAllOrders();
      },
      error: () => {

      }
    });
    this.modelService.dismissAll();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  updateOrder(id: any) {
    this.service.updateOrder(id, this.addOrderForm.value).subscribe(res => {
      this.snackBar.open("Order Updated successfully", 'OK', { duration: 2000, verticalPosition: 'top', panelClass: ['green-snackbar'] });
      this.getAllOrders();
    })
    this.modelService.dismissAll();
  }

  addNewProduct() {
    if (this.editSet) {
      this.updateOrder(this.editSet.id);
    }
    else {
      this.service.addOrder(this.addOrderForm.value).subscribe(res => {
        this.snackBar.open("Order Placed successfully", 'OK', { duration: 2000, verticalPosition: 'top', panelClass: ['green-snackbar'] });
        this.getAllOrders();
      })
      this.modelService.dismissAll();
    }
  }



}
