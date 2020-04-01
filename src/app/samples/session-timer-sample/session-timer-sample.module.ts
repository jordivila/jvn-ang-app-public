import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SessionTimerSampleComponent } from './session-timer-sample.component';



const routes = [{
  path: '',
  component: SessionTimerSampleComponent,
  children: [
    { path: '', component: SessionTimerSampleComponent },
  ]
}] as Route[];


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SessionTimerSampleComponent],
})
export class SessionTimerSampleModule { }
