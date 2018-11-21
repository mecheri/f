﻿import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// RxJS
import { throwError } from 'rxjs';
import { finalize } from 'rxjs/operators';

// Services
import { Spinner } from './../../../core/services/spinner.service';
import { AuthService } from './../../../core/services/auth.service';
import { ResourcesService } from './../../../core/services/resources.service';

// Models
import { Auth } from './../../../core/models/auth';

/**
 * Login Componenet
 *
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    rsc: any;
    model: Auth;
    errorMessage: any;

    /**
     * Creates an instance of LoginComponent.
     * @param {Router} router
     * @param {Spinner} spinner
     * @param {ResourcesService} rscService
     * @param {AuthService} authService
     * @memberof LoginComponent
     */
    constructor(
        private router: Router,
        private spinner: Spinner,
        private rscService: ResourcesService,
        private authService: AuthService
    ) {
        this.model = new Auth();
    }

    /**
     * Component Init
     *
     * @memberof LoginComponent
     */
    ngOnInit() {
        this.loadResources();
    }

    /**
     * Load resources
     *
     * @memberof LoginComponent
     */
    loadResources() {
        this.rsc = this.rscService.rsc.pages.login;
    }

    /**
     * Login to the app.
     *
     * @memberof LoginComponent
     */
    login() {
        this.spinner.show();
        this.authService.check(this.model)
            .pipe(finalize(() => this.spinner.hide()))
            .subscribe(
                () => this.router.navigate(['home']),
                (error) => {
                    console.log(error);
                    this.errorMessage = error;
                }
            );
    }

    /**
     * Go to register page.
     *
     * @memberof LoginComponent
     */
    register() {
        this.router.navigate(['register']);
    }

    /**
     * Event handle on enter keypress event
     *
     * @param {number} keyCode
     * @memberof LoginComponent
     */
    eventHandler(keyCode: number) {
        if (keyCode === 13) { this.login(); }
    }
}
