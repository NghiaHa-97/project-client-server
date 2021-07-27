import {animate, state, style, transition, trigger} from "@angular/animations";

export const errorState= trigger('errorState', [
    state('hidden', style({
        // opacity: 0
        display: 'none'
    })),
    state('visible', style({
        // opacity: 1
        display: 'visibility'
    })),
    transition('visible => hidden', animate('400ms ease-in')),
    transition('hidden => visible', animate('400ms ease-out'))
]);


export const rowExpansionTrigger=  trigger('rowExpansionTrigger', [
    state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
    })),
    state('active', style({
        transform: 'translateX(0)',
        opacity: 1
    })),
    transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
]);

