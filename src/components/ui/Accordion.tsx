import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

interface AccordionItem {
  id: string | number;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className,
}) => {
  const [openItems, setOpenItems] = useState<Record<string | number, boolean>>({});

  const handleToggle = (id: string | number) => {
    if (allowMultiple) {
      setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
    } else {
      setOpenItems((prev) => {
        const isCurrentOpen = prev[id];
        return { [id]: !isCurrentOpen };
      });
    }
  };

  return (
    <div className={cn('space-y-4 w-full', className)}>
      {items.map((item) => {
        const isOpen = !!openItems[item.id];
        return (
          <div
            key={item.id}
            className="border border-gray-100 dark:border-dark-700 bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-card transition-all duration-300"
          >
            <button
              onClick={() => handleToggle(item.id)}
              className="w-full flex items-center justify-between px-6 py-4.5 text-left font-medium text-gray-900 dark:text-gray-100 focus:outline-none hover:bg-gray-50/50 dark:hover:bg-dark-700/30 transition-colors"
            >
              <span>{item.title}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400 dark:text-gray-500"
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  <div className="px-6 pb-6 pt-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-dark-700/50">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
export default Accordion;
