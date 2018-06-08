import { NgModule } from '@angular/core';
import { LinkPipe } from './../pipes/link/link';
import { SincePipe } from './../pipes/since/since';

@NgModule({
    declarations: [SincePipe, LinkPipe],
    imports: [],
    exports: [SincePipe, LinkPipe]
})
export class PipesModule {
    static forChild(){
        return {
            ngModule: PipesModule,
            providers: []
        }
    };
}