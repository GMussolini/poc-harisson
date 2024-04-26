import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-resumo-referencia',
  templateUrl: './modal-resumo-referencia.component.html',
  styleUrls: ['./modal-resumo-referencia.component.css'],
})
export class ModalResumoReferenciaComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ModalResumoReferenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { resume: string }
  ) {}

  ngOnInit() {}

  OnCloseDialog() {
    this.dialogRef.close();
  }
}
