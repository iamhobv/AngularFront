import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-exam',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-exam.component.html',
  styleUrl: './add-exam.component.css'
})
export class AddExamComponent {
ExamForm = new FormGroup({
     title : new FormControl('',[Validators.required]),
     duration: new FormControl('',[Validators.required]),
});

get getTitle(){
  return this.ExamForm.controls['title'];
}

get getDuration(){
  return this.ExamForm.controls['duration'];
}



AddExam(){
  console.log("Submit Exam");
}
}
