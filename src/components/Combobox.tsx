import React, { useState, useRef, useEffect } from 'react';
import type { Team } from '../services/footballApi';
import { searchTeams } from '../services/footballApi';
import './Combobox.css';

/**
 * Props interface for the Combobox component
 */
interface ComboboxProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string, logo?: string) => void;  // Callback with team name and optional logo URL
  disabled?: boolean;
  required?: boolean;
}

/**
 * WAI-ARIA compliant Combobox component with autocomplete functionality
 * Features:
 * - Real-time team search via Football API
 * - Keyboard navigation (Arrow Up/Down, Enter, Escape)
 * - Debounced search (300ms) to optimize API calls
 * - Loading states and error handling
 * - Accessibility: ARIA attributes for screen readers
 */
export const Combobox: React.FC<ComboboxProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
}) => {
  // State management
  const [isOpen, setIsOpen] = useState(false);           // Dropdown visibility
  const [teams, setTeams] = useState<Team[]>([]);        // Search results
  const [selectedIndex, setSelectedIndex] = useState(-1); // Keyboard navigation index
  const [isLoading, setIsLoading] = useState(false);     // Loading indicator
  
  // Refs for DOM elements
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      if (value.trim().length < 2) {
        setTeams([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchTeams(value);
        setTeams(results);
        setIsOpen(results.length > 0);
      } catch (error) {
        console.error('Error searching teams:', error);
        setTeams([]);
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
      setSelectedIndex(-1);
    };

    // Debounce search requests by 300ms to avoid excessive API calls
    const debounceTimer = setTimeout(fetchTeams, 300);
    return () => clearTimeout(debounceTimer);
  }, [value]);

  /**
   * Handles input field changes
   * Triggers the debounced search in useEffect
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  /**
   * Handles team selection from dropdown
   * Passes both team name and logo URL to parent component
   */
  const handleOptionClick = (team: Team) => {
    onChange(team.name, team.logo);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  /**
   * Keyboard navigation handler
   * - ArrowDown: Move to next option
   * - ArrowUp: Move to previous option
   * - Enter: Select current option
   * - Escape: Close dropdown
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < teams.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < teams.length) {
          handleOptionClick(teams[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
      case 'Tab':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleBlur = () => {
    // Delay to allow click on option
    setTimeout(() => {
      setIsOpen(false);
      setSelectedIndex(-1);
    }, 200);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    try {
      const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
      return (
        <>
          {parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
              <span key={index} className="combobox-highlight">
                {part}
              </span>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </>
      );
    } catch {
      return text;
    }
  };

  // Scroll selected option into view
  useEffect(() => {
    if (selectedIndex >= 0 && listboxRef.current) {
      const selectedOption = listboxRef.current.children[selectedIndex] as HTMLElement;
      if (selectedOption) {
        selectedOption.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div className="combobox-container">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        type="text"
        className={`combobox-input ${isOpen ? 'has-suggestions' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        disabled={disabled}
        required={required}
        role="combobox"
        aria-autocomplete="list"
        aria-controls={`${id}-listbox`}
        aria-expanded={isOpen}
        aria-activedescendant={
          selectedIndex >= 0 ? `${id}-option-${selectedIndex}` : undefined
        }
      />
      {isOpen && (
        <ul
          ref={listboxRef}
          id={`${id}-listbox`}
          className="combobox-listbox"
          role="listbox"
        >
          {isLoading ? (
            <li className="combobox-loading">
              <span className="loading-spinner-small"></span>
              Buscando equipos...
            </li>
          ) : teams.length > 0 ? (
            teams.map((team, index) => (
              <li
                key={`${team.id}-${index}`}
                id={`${id}-option-${index}`}
                className="combobox-option"
                role="option"
                aria-selected={selectedIndex === index}
                onClick={() => handleOptionClick(team)}
              >
                {team.logo.startsWith('http') ? (
                  <img src={team.logo} alt="" className="combobox-team-logo" />
                ) : (
                  <span className="combobox-option-icon">{team.logo}</span>
                )}
                <div className="combobox-option-content">
                  <div className="combobox-option-name">
                    {highlightMatch(team.name, value)}
                  </div>
                  <div className="combobox-option-country">
                    {team.country}
                  </div>
                </div>
              </li>
            ))
          ) : value.trim().length >= 2 ? (
            <li className="combobox-no-results">
              No se encontraron equipos. Puedes escribir cualquier equipo.
            </li>
          ) : null}
        </ul>
      )}
    </div>
  );
};
