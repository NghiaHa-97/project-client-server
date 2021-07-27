import {Component} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import * as moment from "moment";
import {MonHocService} from "./mon-hoc.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NguoiDungCTDTO} from "../model/NguoiDungCTDTO.modet";
import {DDMMYYYY} from "../const/app.const";
import {PasswordValidation} from "../forms/validationforms/password-validator.component";
import {MonHoc} from "../model/MonHoc.model";
import {DangKyKhamComponent} from "../shared/dang-ky-kham/dang-ky-kham.component";
import {NzModalService} from "ng-zorro-antd/modal";



export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector:'app-mon-hoc-update',
    templateUrl:'./mon-hoc-update.component.html',
    styleUrls:['./mon-hoc-update.component.css']
})
export class MonHocUpdateComponent{

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    validEmailRegister: boolean = false;
    validConfirmPasswordRegister: boolean = false;
    validPasswordRegister: boolean = false;

    validEmailLogin: boolean = false;
    validPasswordLogin: boolean = false;

    validTextType: boolean = false;
    validEmailType: boolean = false;
    validNumberType: boolean = false;
    validUrlType: boolean = false;
    pattern = "https?://.+";
    validSourceType: boolean = false;
    validDestinationType: boolean = false;

    matcher = new MyErrorStateMatcher();
    register : FormGroup;
    login : FormGroup;
    type : FormGroup;

    monHoc:MonHoc;


    constructor(private formBuilder: FormBuilder,
                private monHocService:MonHocService,
                private activateRouter:ActivatedRoute,
                private router:Router,
                private toarService:ToastrService,
                private modalService: NzModalService ) {}

    showModal2(): void {
        this.modalService.create({
            nzContent: DangKyKhamComponent,
            nzWidth:900
        });
    }
    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }

    displayFieldCss(form: FormGroup, field: string) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    }

    // onRegister() {
    //     if (this.register.valid) {
    //     } else {
    //         this.validateAllFormFields(this.register);
    //     }
    // }
    // onLogin() {
    //     if (this.login.valid) {
    //     } else {
    //         this.validateAllFormFields(this.login);
    //     }
    // }
    onType() {
        //nếu không có lỗi thì gọi vào
        if (this.type.valid) {
            // console.log("aaaaaaa");
            console.log(this.type.value);
            this.monHoc=this.type.value;


            this.monHocService.saveMonHoc(this.monHoc).subscribe(
                response=>{
                    this.toarService.success("Lưu thành công")
                    this.resetForm();
                    this.monHoc=null;
                },
                error => {
                    this.toarService.error("Lưu thất bại")
            });

        } else {
            this.validateAllFormFields(this.type);
        }
    }
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
    ngOnInit() {

        'use strict';

        const modal = document.querySelector('.modal');
        const overlay = document.querySelector('.overlay');
        const btnScrollTo = document.querySelector('.btn--scroll-to');
        const section1 = document.querySelector('#section--1');
        const nav = document.querySelector('.nav');
        const tabs = document.querySelectorAll('.operations__tab');
        const tabsContainer = document.querySelector('.operations__tab-container');
        const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

        const openModal = function (e) {
            e.preventDefault();
            modal.classList.remove('hidden');
            overlay.classList.remove('hidden');
        };

        const closeModal = function () {
            modal.classList.add('hidden');
            overlay.classList.add('hidden');
        };


        overlay.addEventListener('click', closeModal);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });

///////////////////////////////////////
// Button scrolling
        btnScrollTo.addEventListener('click', function (e) {
            const s1coords = section1.getBoundingClientRect();
            console.log(s1coords);

            console.log((<Element>e.target).getBoundingClientRect());

            console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

            console.log(
                'height/width viewport',
                document.documentElement.clientHeight,
                document.documentElement.clientWidth
            );

            // Scrolling
            // window.scrollTo(
            //   s1coords.left + window.pageXOffset,
            //   s1coords.top + window.pageYOffset
            // );

            // window.scrollTo({
            //   left: s1coords.left + window.pageXOffset,
            //   top: s1coords.top + window.pageYOffset,
            //   behavior: 'smooth',
            // });

            section1.scrollIntoView({ behavior: 'smooth' });
        });

///////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

        document.querySelector('.nav__links').addEventListener('click', function (e) {
            e.preventDefault();

            // Matching strategy
            if ((<Element>e.target).classList.contains('nav__link')) {
                const id = (<Element>e.target).getAttribute('href');
                document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
            }
        });

///////////////////////////////////////
// Tabbed component

        tabsContainer.addEventListener('click', function (e) {
            const elementTaget = <Element>e.target;
            const clicked = elementTaget.closest('.operations__tab');

            // Guard clause
            if (!clicked) return;

            // Remove active classes
            tabs.forEach(t => t.classList.remove('operations__tab--active'));
            tabsContent.forEach(c => c.classList.remove('operations__content--active'));

            // Activate tab
            clicked.classList.add('operations__tab--active');

            // Activate content area
            document
                .querySelector(`.operations__content--${(<HTMLElement>clicked).dataset.tab}`)
                .classList.add('operations__content--active');
        });

///////////////////////////////////////
// Menu fade animation
        const handleHover = function (e) {
            if (e.target.classList.contains('nav__link')) {
                const link = e.target;
                const siblings = link.closest('.nav').querySelectorAll('.nav__link');
                const logo = link.closest('.nav').querySelector('img');

                siblings.forEach(el => {
                    if (el !== link) el.style.opacity = this;
                });
                logo.style.opacity = this;
            }
        };

// Passing "argument" into handler
        nav.addEventListener('mouseover', handleHover.bind(0.5));
        nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

        const header = document.querySelector('.header');
        const navHeight = nav.getBoundingClientRect().height;

        const stickyNav = function (entries) {
            const [entry] = entries;
            // console.log(entry);

            if (!entry.isIntersecting) nav.classList.add('sticky');
            else nav.classList.remove('sticky');
        };

        const headerObserver = new IntersectionObserver(stickyNav, {
            root: null,
            threshold: 0,
            rootMargin: `-${navHeight}px`,
        });

        headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections
        const allSections = document.querySelectorAll('.section');

        const revealSection = function (entries, observer) {
            const [entry] = entries;

            if (!entry.isIntersecting) return;

            entry.target.classList.remove('section--hidden');
            observer.unobserve(entry.target);
        };

        const sectionObserver = new IntersectionObserver(revealSection, {
            root: null,
            threshold: 0.15,
        });

        allSections.forEach(function (section) {
            sectionObserver.observe(section);
            section.classList.add('section--hidden');
        });

// Lazy loading images
        const imgTargets = document.querySelectorAll('img[data-src]');

        const loadImg = function (entries, observer) {
            const [entry] = entries;

            if (!entry.isIntersecting) return;

            // Replace src with data-src
            entry.target.src = entry.target.dataset.src;

            entry.target.addEventListener('load', function () {
                entry.target.classList.remove('lazy-img');
            });

            observer.unobserve(entry.target);
        };

        const imgObserver = new IntersectionObserver(loadImg, {
            root: null,
            threshold: 0,
            rootMargin: '200px',
        });

        imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// Slider
        const slider = function () {
            const slides = document.querySelectorAll('.slide');
            const btnLeft = document.querySelector('.slider__btn--left');
            const btnRight = document.querySelector('.slider__btn--right');
            const dotContainer = document.querySelector('.dots');

            let curSlide = 0;
            const maxSlide = slides.length;

            // Functions
            const createDots = function () {
                // slides.forEach(function (_, i) {
                //     dotContainer.insertAdjacentHTML(
                //         'beforeend',
                //         `<button class="dots__dot" data-slide="${i}"></button>`
                //     );
                // });
            };

            const activateDot = function (slide) {
                // document
                //     .querySelectorAll('.dots__dot')
                //     .forEach(dot => dot.classList.remove('dots__dot--active'));
                //
                // document
                //     .querySelector(`.dots__dot[data-slide="${slide}"]`)
                //     .classList.add('dots__dot--active');
            };

            const goToSlide = function (slide) {
                slides.forEach(
                    (s, i) => ((<HTMLElement>s).style.transform = `translateX(${100 * (i - slide)}%)`)
                );
            };

            // Next slide
            const nextSlide = function () {
                if (curSlide === maxSlide - 1) {
                    curSlide = 0;
                } else {
                    curSlide++;
                }

                goToSlide(curSlide);
                activateDot(curSlide);
            };

            const prevSlide = function () {
                if (curSlide === 0) {
                    curSlide = maxSlide - 1;
                } else {
                    curSlide--;
                }
                goToSlide(curSlide);
                activateDot(curSlide);
            };

            const init = function () {
                goToSlide(0);
                createDots();

                activateDot(0);
            };
            init();

            // Event handlers
            // btnRight.addEventListener('click', nextSlide);
            // btnLeft.addEventListener('click', prevSlide);

            document.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowLeft') prevSlide();
                e.key === 'ArrowRight' && nextSlide();
            });

            // dotContainer.addEventListener('click', function (e) {
            //     // if ((<HTMLElement>e.target).classList.contains('dots__dot')) {
            //     //     const { slide } = (<HTMLElement>e.target).dataset;
            //     //     goToSlide(slide);
            //     //     activateDot(slide);
            //     // }
            // });
        };
        slider();

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

        /*
        ///////////////////////////////////////
        // Selecting, Creating, and Deleting Elements

        // Selecting elements
        console.log(document.documentElement);
        console.log(document.head);
        console.log(document.body);

        const header = document.querySelector('.header');
        const allSections = document.querySelectorAll('.section');
        console.log(allSections);

        document.getElementById('section--1');
        const allButtons = document.getElementsByTagName('button');
        console.log(allButtons);

        console.log(document.getElementsByClassName('btn'));

        // Creating and inserting elements
        const message = document.createElement('div');
        message.classList.add('cookie-message');
        // message.textContent = 'We use cookied for improved functionality and analytics.';
        message.innerHTML =
          'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

        // header.prepend(message);
        header.append(message);
        // header.append(message.cloneNode(true));

        // header.before(message);
        // header.after(message);

        // Delete elements
        document
          .querySelector('.btn--close-cookie')
          .addEventListener('click', function () {
            // message.remove();
            message.parentElement.removeChild(message);
          });


        ///////////////////////////////////////
        // Styles, Attributes and Classes

        // Styles
        message.style.backgroundColor = '#37383d';
        message.style.width = '120%';

        console.log(message.style.color);
        console.log(message.style.backgroundColor);

        console.log(getComputedStyle(message).color);
        console.log(getComputedStyle(message).height);

        message.style.height =
          Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

        document.documentElement.style.setProperty('--color-primary', 'orangered');

        // Attributes
        const logo = document.querySelector('.nav__logo');
        console.log(logo.alt);
        console.log(logo.className);

        logo.alt = 'Beautiful minimalist logo';

        // Non-standard
        console.log(logo.designer);
        console.log(logo.getAttribute('designer'));
        logo.setAttribute('company', 'Bankist');

        console.log(logo.src);
        console.log(logo.getAttribute('src'));

        const link = document.querySelector('.nav__link--btn');
        console.log(link.href);
        console.log(link.getAttribute('href'));

        // Data attributes
        console.log(logo.dataset.versionNumber);

        // Classes
        logo.classList.add('c', 'j');
        logo.classList.remove('c', 'j');
        logo.classList.toggle('c');
        logo.classList.contains('c'); // not includes

        // Don't use
        logo.clasName = 'jonas';


        ///////////////////////////////////////
        // Types of Events and Event Handlers
        const h1 = document.querySelector('h1');

        const alertH1 = function (e) {
          alert('addEventListener: Great! You are reading the heading :D');
        };

        h1.addEventListener('mouseenter', alertH1);

        setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

        // h1.onmouseenter = function (e) {
        //   alert('onmouseenter: Great! You are reading the heading :D');
        // };


        ///////////////////////////////////////
        // Event Propagation in Practice
        const randomInt = (min, max) =>
          Math.floor(Math.random() * (max - min + 1) + min);
        const randomColor = () =>
          `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

        document.querySelector('.nav__link').addEventListener('click', function (e) {
          this.style.backgroundColor = randomColor();
          console.log('LINK', e.target, e.currentTarget);
          console.log(e.currentTarget === this);

          // Stop propagation
          // e.stopPropagation();
        });

        document.querySelector('.nav__links').addEventListener('click', function (e) {
          this.style.backgroundColor = randomColor();
          console.log('CONTAINER', e.target, e.currentTarget);
        });

        document.querySelector('.nav').addEventListener('click', function (e) {
          this.style.backgroundColor = randomColor();
          console.log('NAV', e.target, e.currentTarget);
        });


        ///////////////////////////////////////
        // DOM Traversing
        const h1 = document.querySelector('h1');

        // Going downwards: child
        console.log(h1.querySelectorAll('.highlight'));
        console.log(h1.childNodes);
        console.log(h1.children);
        h1.firstElementChild.style.color = 'white';
        h1.lastElementChild.style.color = 'orangered';

        // Going upwards: parents
        console.log(h1.parentNode);
        console.log(h1.parentElement);

        h1.closest('.header').style.background = 'var(--gradient-secondary)';

        h1.closest('h1').style.background = 'var(--gradient-primary)';

        // Going sideways: siblings
        console.log(h1.previousElementSibling);
        console.log(h1.nextElementSibling);

        console.log(h1.previousSibling);
        console.log(h1.nextSibling);

        console.log(h1.parentElement.children);
        [...h1.parentElement.children].forEach(function (el) {
          if (el !== h1) el.style.transform = 'scale(0.5)';
        });

        ///////////////////////////////////////
        // Sticky navigation
        const initialCoords = section1.getBoundingClientRect();
        console.log(initialCoords);

        window.addEventListener('scroll', function () {
          console.log(window.scrollY);

          if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
          else nav.classList.remove('sticky');
        });

        ///////////////////////////////////////
        // Sticky navigation: Intersection Observer API

        const obsCallback = function (entries, observer) {
          entries.forEach(entry => {
            console.log(entry);
          });
        };

        const obsOptions = {
          root: null,
          threshold: [0, 0.2],
        };

        const observer = new IntersectionObserver(obsCallback, obsOptions);
        observer.observe(section1);


        ///////////////////////////////////////
        // Lifecycle DOM Events
        document.addEventListener('DOMContentLoaded', function (e) {
          console.log('HTML parsed and DOM tree built!', e);
        });

        window.addEventListener('load', function (e) {
          console.log('Page fully loaded', e);
        });

        window.addEventListener('beforeunload', function (e) {
          e.preventDefault();
          console.log(e);
          e.returnValue = '';
        });
        */


























































































































        // this.type = this.formBuilder.group({
        //     id: null,
        //     maMonHoc: [null, Validators.required],
        //     tenMonHoc: [null, Validators.required],
        //     soTinChi: [null, Validators.required],
        //     soTietGiangDay: [null, Validators.required]
        // });

        this.activateRouter.data.subscribe(data=>{
            if(data['MonHoc']){
                this.monHoc=data['MonHoc'].body;
                console.log(this.monHoc);
                if(this.monHoc){
                    this.type.setValue({
                        id:this.monHoc.id,
                        maMonHoc:this.monHoc.maMonHoc,
                        tenMonHoc: this.monHoc.tenMonHoc,
                        soTinChi: this.monHoc.soTinChi,
                        soTietGiangDay: this.monHoc.soTietGiangDay,

                    })
                }
            }}
        )


        // this.register = this.formBuilder.group({
        //     // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
        //     email: [null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        //     // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
        //     optionsCheckboxes: ['', Validators.required],
        //     password: ['',  Validators.compose([Validators.required, Validators.minLength(6)])],
        //     confirmPassword: ['', Validators.required],
        //     text: [null, Validators.required],
        // }, {
        //     validator: PasswordValidation.MatchPassword // your validation method
        // });
        // this.login = this.formBuilder.group({
        //     // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
        //     email: [null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        //     // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
        //     password: ['', Validators.required]
        // });
        // this.type = this.formBuilder.group({
        //     // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
        //     // text: [null, Validators.required],
        //
        //     userName: [null, Validators.required],
        //     diaChi: [null, Validators.required],
        //     hoTen: [null, Validators.required],
        //     sdt: [null, Validators.required],
        //     taiKhoan: [null, Validators.required],
        //     ngaySinhDate:[new Date(1990,0,1)],
        //     gioiTinh:['true'],
        //     email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        //     // number: [null, Validators.required],
        //     // url: [null , Validators.required],
        //     // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
        //     password: ['', Validators.required],
        //     confirmPassword: ['', Validators.required],
        // }, {
        //     validator: PasswordValidation.MatchPassword // your validation method
        // });


    }

    emailValidationRegister(e){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(e).toLowerCase())) {
            this.validEmailRegister = true;
        } else {
            this.validEmailRegister = false;
        }
    }
    passwordValidationRegister(e){
        if(e){
            if (e.length > 5) {
                this.validPasswordRegister = true;
            }else{
                this.validPasswordRegister = false;
            }
        }

    }
    confirmPasswordValidationRegister(e){
        if(e){
            if (this.type.controls['password'].value === e) {
                this.validConfirmPasswordRegister = true;
            }else{
                this.validConfirmPasswordRegister = false;
            }
        }

    }

    emailValidationLogin(e){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(e).toLowerCase())) {
            this.validEmailLogin= true;
        } else {
            this.validEmailLogin = false;
        }
    }
    passwordValidationLogin(e){
        if (e.length > 5) {
            this.validPasswordLogin = true;
        }else{
            this.validPasswordLogin = false;
        }
    }


    textValidationType(e){
        if (e) {
            this.validTextType = true;
        }else{
            this.validTextType = false;
        }
    }
    emailValidationType(e){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(e).toLowerCase())) {
            this.validEmailType = true;
        } else {
            this.validEmailType = false;
        }
    }
    numberValidationType(e){
        if (e) {
            this.validNumberType = true;
        }else{
            this.validNumberType = false;
        }
    }
    urlValidationType(e){
        try {
            new URL(e);
            this.validUrlType = true;
        } catch (_) {
            this.validUrlType = false;
        }
    }
    sourceValidationType(e){
        if (e) {
            this.validSourceType = true;
        }else{
            this.validSourceType = false;
        }
    }
    confirmDestinationValidationType(e){
        if (this.type.controls['password'].value === e) {
            this.validDestinationType = true;
        }else{
            this.validDestinationType = false;
        }
    }

    back() {
        this.router.navigate(['qlmonhocphancong/monhocphancong']);
    }


    resetForm(){
        this.type.setValue({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            // text: [null, Validators.required],
            id:null,
            maMonHoc:null,
            tenMonHoc: null,
            soTinChi: null,
            soTietGiangDay: null
        });
    }

}
