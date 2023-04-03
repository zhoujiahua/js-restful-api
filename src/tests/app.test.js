// src/tests/app.test.js
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const calculator = require('@/utils/calculator');

describe('Calculator', () => {
  it('should add two numbers correctly', () => {
    const result = calculator.add(2, 3);
    expect(result).to.equal(5);
  });

  it('should subtract two numbers correctly', () => {
    const result = calculator.subtract(5, 3);
    expect(result).to.equal(2);
  });

  it('should call add function with correct arguments', () => {
    const addSpy = sinon.spy(calculator, 'add');
    calculator.add(4, 5);
    expect(addSpy.calledOnce).to.be.true;
    expect(addSpy.calledWith(4, 5)).to.be.true;
    addSpy.restore();
  });

  it('should call subtract function with correct arguments', () => {
    const subtractSpy = sinon.spy(calculator, 'subtract');
    calculator.subtract(7, 2);
    expect(subtractSpy.calledOnce).to.be.true;
    expect(subtractSpy.calledWith(7, 2)).to.be.true;
    subtractSpy.restore();
  });
});
