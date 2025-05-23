import { Component, OnInit } from '@angular/core';
import { ShowExamsToTeacherService } from '../../../Services/show-exams-to-teacher.service';
import { IShowExamsToTeacher } from '../../../Models/ishow-exams-to-teacher';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-show-all-exams',
  imports: [FormsModule,RouterLink],
  templateUrl: './show-all-exams.component.html',
  styleUrl: './show-all-exams.component.css'
})
export class ShowAllExamsComponent implements OnInit{

  examData:IShowExamsToTeacher[]=[]
   
  constructor(
    private _ShowExamsToTeacherService :ShowExamsToTeacherService
  )
  {}

ngOnInit(): void {
  this._ShowExamsToTeacherService.GetExams().subscribe({
    next:(res)=>{ 
      this.examData=res.data;
      console.log(res);
      console.log("Exam Data:", this.examData);
    },
    error:(err)=>{
      console.log(err);
    }
  })
}
// formatDuration(duration: string): string {
//   const [hoursStr, minutesStr, secondsStr] = duration.split(':');

//   const hours = parseInt(hoursStr, 10);
//   const minutes = parseInt(minutesStr, 10);

//   let result = '';
//   if (hours > 0) {
//     result += `${hours} hour${hours > 1 ? 's' : ''}`;
//   }

//   if (minutes > 0) {
//     result += hours > 0 ? ` and ${minutes} minute${minutes > 1 ? 's' : ''}` : `${minutes} minute${minutes > 1 ? 's' : ''}`;
//   }

//   if (result === '') {
//     result = 'Less than a minute';
//   }

//   return result;
// }

formatDuration(duration: string): string {
  const [hours, minutes] = duration.split(':').map(Number);
  const hourText = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '';
  const minuteText = minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : '';
  return `${hourText} ${minuteText}`.trim() || 'Less than a minute';
}

onDelete(id: number) {
this._ShowExamsToTeacherService.deleteExam(id).subscribe({
  next: res => { 
      this.examData = this.examData.filter(e => e.id !== id);
    },
    error: err => {
      console.error('Error deleting exam:', err);
    }
})
}

}
