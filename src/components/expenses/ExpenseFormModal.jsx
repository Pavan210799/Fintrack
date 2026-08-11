import { useEffect, useState } from 'react';
import { LuX } from 'react-icons/lu';
import { useFinance } from '../../context/FinanceContext';
import './ExpenseFormModal.css';

const ExpenseFormModal = ({
  isOpen,
  onClose,
  editingTransaction,
}) => {
  const { addTransaction, updateTransaction } =
    useFinance();

  const initialForm = {
    title: '',
    amount: '',
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'Card',
  };

  const [formData, setFormData] =
    useState(initialForm);

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        title: editingTransaction.title,
        amount: editingTransaction.amount,
        type: editingTransaction.type,
        category: editingTransaction.category,
        date: editingTransaction.date,
        paymentMethod:
          editingTransaction.paymentMethod ||
          'Card',
      });
    } else {
      setFormData(initialForm);
    }
  }, [editingTransaction, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const transactionData = {
      title: formData.title,
      amount: Number(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date,
      paymentMethod: formData.paymentMethod,
    };

    if (editingTransaction) {
      updateTransaction(
        editingTransaction.id,
        transactionData
      );
    } else {
      addTransaction({
        id: Date.now(),
        ...transactionData,
      });
    }

    setFormData(initialForm);
    onClose();
  };

  return (
    <div className='modal-overlay'>
      <div className='modal-card'>
        <div className='modal-header'>
          <h2>
            {editingTransaction
              ? 'Edit transaction'
              : 'Add transaction'}
          </h2>

          <button
            className='modal-close'
            onClick={onClose}
            type='button'
          >
            <LuX />
          </button>
        </div>

        <form
          className='transaction-form'
          onSubmit={handleSubmit}
        >
          <div className='form-group'>
            <label>Title</label>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleChange}
              placeholder='Enter transaction title'
              required
            />
          </div>

          <div className='form-group'>
            <label>Amount</label>
            <input
              type='number'
              name='amount'
              value={formData.amount}
              onChange={handleChange}
              placeholder='Enter amount'
              required
            />
          </div>

          <div className='form-row'>
            <div className='form-group'>
              <label>Type</label>
              <select
                name='type'
                value={formData.type}
                onChange={handleChange}
              >
                <option value='expense'>
                  Expense
                </option>
                <option value='income'>
                  Income
                </option>
              </select>
            </div>

            <div className='form-group'>
              <label>Category</label>
              <select
                name='category'
                value={formData.category}
                onChange={handleChange}
              >
                <option>Food</option>
                <option>Transport</option>
                <option>Shopping</option>
                <option>Bills</option>
                <option>Entertainment</option>
                <option>Health</option>
                <option>Salary</option>
              </select>
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group'>
              <label>Date</label>
              <input
                type='date'
                name='date'
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <label>Payment method</label>
              <select
                name='paymentMethod'
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option>Card</option>
                <option>UPI</option>
                <option>Cash</option>
                <option>Net Banking</option>
              </select>
            </div>
          </div>

          <div className='form-actions'>
            <button
              type='button'
              className='cancel-btn'
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type='submit'
              className='save-btn'
            >
              {editingTransaction
                ? 'Update transaction'
                : 'Save transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseFormModal;