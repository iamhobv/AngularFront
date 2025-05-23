import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnDestroy } from '@angular/core';
import { StudentService } from '../../Services/student.service';
import { interval, map, Subscription, take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-take-exam',
  imports: [FormsModule, CommonModule],
  templateUrl: './student-take-exam.component.html',
  styleUrl: './student-take-exam.component.css',
})
export class StudentTakeExamComponent implements OnDestroy {
  private readonly router = inject(Router);

  body: {
    examId: any;
    studentId: any;
    submittedAt: any;
    startedAt: any;
    studentAnswerDTOList: { questionId: any; StudentAnser: any }[];
  };

  exam: any;
  examId: any;
  examQuestionCount!: number;
  duration: any;
  d!: [number, number, number];
  startTime!: number;

  constructor(
    private _StudentService: StudentService,
    private activatedRoute: ActivatedRoute
  ) {
    this.body = {
      examId: null,
      studentId: null,
      submittedAt: null,
      startedAt: null,
      studentAnswerDTOList: [] as { questionId: any; StudentAnser: any }[],
    };
  }
  ngOnInit(): void {
    this.examId = this.activatedRoute.snapshot.paramMap.get('examId');
    this.body.startedAt = this.getCurrentSqlDateTime();
    this.body.studentId = localStorage.getItem('userId');

    this._StudentService
      .CheckStdExam(this.examId, this.body.studentId)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.isPass) {
            this._StudentService.GetExam(this.examId).subscribe({
              next: (res) => {
                this.exam = res.data;
                this.examQuestionCount = this.exam.questions.length;
                this.duration = this.exam.duration;
                this.d = this.duration.split(':').map(Number);
                this.startTime = this.d[0] * 3600 + this.d[1] * 60 + this.d[2];
                this.startCountdown(this.startTime);
                console.log('incoming data');
                console.log(this.exam);
              },
              error: (err) => {
                console.log(err);
              },
            });
          } else if (!res.isPass) {
            this.router.navigate(['/S/home']);
            confirm('This student take this exam before');
          }
        },
      });
  }

  private countdownSubscription: Subscription | undefined;

  remainingTime: string = '00:00';
  ngOnDestroy(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  startCountdown(duration: number) {
    this.countdownSubscription = interval(1000)
      .pipe(
        map((secondsElapsed) => duration - secondsElapsed),
        take(duration + 1)
      )
      .subscribe((secondsLeft) => {
        if (secondsLeft >= 0) {
          const minutes = Math.floor(secondsLeft / 60);
          const remainingSeconds = secondsLeft % 60;
          this.remainingTime = `${this.pad(minutes)}:${this.pad(
            remainingSeconds
          )}`;
          // console.log(this.remainingTime);
          if (this.remainingTime == '00:00') {
            console.log("Time's up!");
            this.submitOnTimeout();
          }
        } else {
          this.remainingTime = "Time's up!";

          console.log("Time's up!");
          // if (this.remainingTime == "Time's up!") {
          //   console.log("Time's up!");
          //   this.submitOnTimeout();
          // }

          if (this.countdownSubscription) {
            this.countdownSubscription.unsubscribe();
          }
        }
      });
  }
  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
  /**------------------------------------------------ */
  isAllAnswered(): boolean {
    return this.exam.questions.every(
      (q: any) => q.selectedOption !== undefined && q.selectedOption !== null
    );
  }
  submitAnswers() {
    if (!this.isAllAnswered()) {
      alert('Please answer all questions before submitting.');
      return;
    }

    const answers = this.exam.questions.map((q: any) => ({
      QuestionID: q.questionId,
      StudentQuestionAnswer: String(q.selectedOption),
    }));

    this.body.submittedAt = this.getCurrentSqlDateTime();
    this.body.examId = this.examId as number;
    this.body.studentId = localStorage.getItem('userId');
    this.body.studentAnswerDTOList = answers;

    let payload = {
      StudentID: localStorage.getItem('userId'),
      ExamID: Number(this.examId),
      StartedAt: this.body.startedAt,
      SubmittedAt: this.body.startedAt,
      StudentAnswerDTOList: answers,
    };
    console.log(JSON.stringify(payload));
    this._StudentService.submitExamAnswers(payload).subscribe({
      next: (res) => {
        if (res.isPass) {
          this.router.navigate(['/S/home']);
          confirm('Your answer has been submitted successfully');
        } else {
          confirm('something went wrong');
        }

        // Optionally navigate away or show result
      },
      error: (err) => {
        console.log('Submission error:', err);
        alert(JSON.stringify(err.error));
      },
    });
  }
  submitOnTimeout() {
    const answers = this.exam.questions.map((q: any) => ({
      QuestionID: q.questionId,
      StudentQuestionAnswer: String(q.selectedOption),
    }));

    this.body.submittedAt = this.getCurrentSqlDateTime();
    this.body.examId = this.examId as number;
    this.body.studentId = localStorage.getItem('userId');
    this.body.studentAnswerDTOList = answers;

    let payload = {
      StudentID: localStorage.getItem('userId'),
      ExamID: Number(this.examId),
      StartedAt: this.body.startedAt,
      SubmittedAt: this.body.startedAt,
      StudentAnswerDTOList: answers,
    };
    console.log(JSON.stringify(payload));
    this._StudentService.submitExamAnswers(payload).subscribe({
      next: (res) => {
        // alert(`Exam submitted successfully! ${res}`);
        // console.log(.);
        console.log(res.isPass);
        if (res.isPass) {
          this.router.navigate(['/S/home']);
          confirm('Your answer has been submitted successfully');
        } else {
          confirm('something went wrong');
        }
        // Optionally navigate away or show result
      },
      error: (err) => {
        console.log('Submission error:', err);
        alert(JSON.stringify(err.error));
      },
    });
  }

  getCurrentSqlDateTime(): string {
    return new Date().toISOString();
    //   const year = now.getFullYear();
    //   const month = (now.getMonth() + 1).toString().padStart(2, '0');
    //   const day = now.getDate().toString().padStart(2, '0');
    //   const hours = now.getHours().toString().padStart(2, '0');
    //   const minutes = now.getMinutes().toString().padStart(2, '0');
    //   const seconds = now.getSeconds().toString().padStart(2, '0');
    //   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
