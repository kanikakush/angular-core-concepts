import { Component } from '@angular/core';
import { HasUnsavedChanges } from '../../_interface/HasUnsavedChanges';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements HasUnsavedChanges {
  name = '';
  savedName = '';

  hasUnsavedChanges(): boolean {
    console.log("Call from edit, hasUnsavedChanges, value of name: {0}, {1}", this.name, this.savedName);
    return this.name !== this.savedName;
  }

  save() {
    this.savedName = this.name;
    console.log("Call from edit, save");
    alert('Profile saved!');
  }
}