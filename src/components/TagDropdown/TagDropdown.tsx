import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { TAG_OPTIONS } from "../../constants/dropdown";
import "./TagDropdown.scss";

export {};

interface TagDropdownProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const TagDropdown: React.FC<TagDropdownProps> = ({
  tags,
  onTagsChange,
}) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleTagRemove = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    onTagsChange(newTags);
  };

  const handleTagSelect = (tag: string) => {
    if (!tags.includes(tag)) {
      onTagsChange([...tags, tag]);
    }
    setShowDropdown(false);
  };

  return (
    <div className="tags-dropdown-container">
      <div className="tags-input">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
            <button
              type="button"
              className="tag-remove"
              onClick={() => handleTagRemove(index)}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="dropdown-wrapper">
        <button
          type="button"
          className="dropdown-button"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown((v) => !v);
          }}
        >
          <ChevronDownIcon width={16} height={16} strokeWidth={2} />
        </button>
        {showDropdown && (
          <div className="tag-dropdown">
            {TAG_OPTIONS.map((option) => (
              <div
                key={option}
                className="tag-dropdown-option"
                onClick={() => handleTagSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
