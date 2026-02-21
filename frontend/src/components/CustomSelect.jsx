import React, { useState, useRef, useEffect } from 'react';

export default function CustomSelect({ value, onChange, options = [], ariaLabel }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    window.addEventListener('pointerdown', handleClick);
    return () => window.removeEventListener('pointerdown', handleClick);
  }, []);

  const selected = options.find(o => o.value === value) || options[0] || { value: '', label: '' };

  const handleItemClick = (e, opt) => {
    e.stopPropagation();
    e.preventDefault();
    // notify parent using a synthetic event shape expected by node handlers
    onChange({ target: { value: opt.value } });
    setOpen(false);
    // restore focus to the button for keyboard users
    try { ref.current.querySelector('button')?.focus(); } catch (err) { /* noop */ }
  };

  return (
    <div className="custom-select" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        className="custom-select__button vs-select"
        onClick={(e) => { e.stopPropagation(); setOpen(s => !s); }}
      >
        <span className="custom-select__label">{selected.label}</span>
        <span className={`custom-select__arrow ${open ? 'open' : ''}`} />
      </button>

      {open && (
        <ul className="custom-select__list" role="listbox">
          {options.map(opt => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`custom-select__item ${opt.value === value ? 'selected' : ''}`}
              onClick={(e) => handleItemClick(e, opt)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
