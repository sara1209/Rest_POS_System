// src/app/features/tables/tables.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PosStateService, Table } from '../../core/services/pos-state.service';



@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tables.html',
  styleUrls: ['./tables.css']
})
export class Tables {
  constructor(
    public posState: PosStateService,
    private router: Router
  ) { }

  onTableClick(table: Table) {
    this.posState.setActiveTable(table.id);
    this.router.navigate(['/tables', table.id]);
  }

  getCircleClass(table: Table): string {
    // Basic mapping for demo purposes, can be moved to service utility
    if (table.label === 'WB') {
      return 'blue'; // default validation
    }
    return '';
  }
}