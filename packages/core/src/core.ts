import express from "express";

export default class Core {
    private options: object;
    constructor(options = {}) {
        this.options = options;
    }
}
