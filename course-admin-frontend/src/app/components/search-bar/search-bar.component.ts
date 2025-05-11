import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class SearchBarComponent {
  searchTerm: string = '';
  isSearching: boolean = false;

  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  onSearch(): void {
    if (this.searchTerm.trim() !== '') {
      this.isSearching = true;
      this.search.emit(this.searchTerm.trim());
    }
  }

  onClear(): void {
    this.searchTerm = '';
    this.isSearching = false;
    this.clear.emit();
  }
}
