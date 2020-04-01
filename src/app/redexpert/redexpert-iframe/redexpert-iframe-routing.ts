import { NgModule } from '@angular/core';
import { RouterModule, Route, UrlSegment, UrlSegmentGroup, UrlMatchResult } from '@angular/router';
import { RedexpertIframeComponent } from './redexpert-iframe.component';

const routes = [{
  path: '',
  component: RedexpertIframeComponent,
}] as Route[];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RedexpertIframeRoutingModule { }



export function RedExpertModulesRouteMatcher(
  segments: UrlSegment[],
  group: UrlSegmentGroup,
  route: Route): UrlMatchResult {

  if ((segments.length > 0) && (
    new RegExp(/redexpert/gm).test(segments[0].path) &&
    new RegExp(/smodule/gm).test(segments[1].path)
  )) {
    return {
      consumed: segments,
      posParams: {
        relativePath: new UrlSegment(`${segments[0].path}/#/${
          segments
            .filter((x, index) => index > 0)
            .map(x => x.path)
            .join('/')
            .toString()
          }`, {})
      }
    };
  }
  return null;
}
