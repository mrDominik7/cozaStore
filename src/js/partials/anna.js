'use strict';

$(document).ready(function () {

    function LogInForm(userEmail, userPassword) {

        this.validateData = () => {

            clearErrorMsg();

            if (!userEmail || !userPassword) {
                showError('Fill in all the fields');
            } else {
                $.getJSON('data/users.json', function (response) {

                    let users = response.users;
                    let usersCount = 0;

                    for (let i = 0; i < users.length; i++) {
                        if (users[i].email === userEmail) {
                            if (users[i].password === userPassword) {
                                // console.log(users[i].name);
                                let parent = $('.wrap-icon-header');
                                $('#logInModal').modal('hide');
                                $('<div/>',{
                                    class: 'user-active',
                                    html: users[i].email
                                }).appendTo(parent);

                            } else {
                                showError('The email or password is not corrected');
                            }
                            break;
                        } else {
                            usersCount++;
                        }
                    }
                    if (usersCount === users.length) {
                        showError('The email or password is not corrected');
                    }

                });
            }

            function showError(text) {
                let parent = $('#logInForm');
                $('<div/>', {
                    class: 'error-msg text-center',
                    html: text
                }).appendTo(parent);
            }

            function clearErrorMsg() {
                $('#logInForm > div.error-msg').remove();
            }

        };
    }

    $('#logInBtn').on('click', function () {

        let emailValue = $('#inputEmail').val();
        let passwordValue = $('#inputPassword').val();
        let newLogInForm = new LogInForm(emailValue, passwordValue);

        newLogInForm.validateData();
    });

});
