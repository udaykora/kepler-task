import { Routes } from '@angular/router';
import { ViewjobComponent } from './viewjob/viewjob.component';
import { ResumeComponent } from './resume/resume.component';
import { PostajobComponent } from './postajob/postajob.component';
import { DummyComponent } from './dummy/dummy.component';
import { RpComponent } from './rp/rp.component';
import { ChatboxComponent } from './chatbox/chatbox.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'mycv',
    pathMatch: 'full',
  },

  {
    path: 'mycv',
    children: [
      {
        path: '',
        component: ResumeComponent,
      },

      {
        path: 'dummy',
        component: DummyComponent,
      },
      {
        path: ':id',
        component: ResumeComponent,
      },
    ],
  },

  {
    path: 'viewjob',
    component: ViewjobComponent,
  },
  {
    path: 'postjob',
    component: PostajobComponent,
  },
  { path: 'rp', component: RpComponent },
  {
    path: 'chatbox',
    component: ChatboxComponent,
  },
];
