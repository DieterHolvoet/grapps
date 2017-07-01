/* globals $ */

export const ajax = options => new Promise((resolve, reject) => {
    $.ajax(options).done(resolve).fail(reject);
});

export const empty = value => (typeof value === 'string' && !value.trim()) || typeof value === 'undefined' || value === null;
