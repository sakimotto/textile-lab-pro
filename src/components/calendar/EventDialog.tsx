'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AnyEvent } from '@/types/calendar';

interface EventDialogProps {
  event: AnyEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (event: AnyEvent) => void;
  onDelete?: (event: AnyEvent) => void;
}

export default function EventDialog({
  event,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: EventDialogProps) {
  const [editedEvent, setEditedEvent] = useState<AnyEvent | null>(event);

  const handleSave = () => {
    if (editedEvent && onSave) {
      onSave(editedEvent);
    }
    onClose();
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event);
    }
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {event?.title || 'Event Details'}
                </Dialog.Title>

                <div className="mt-4">
                  {event?.type === 'test' && (
                    <div>
                      <p className="text-sm text-gray-500">
                        <strong>Test ID:</strong> {event.testId}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Sample ID:</strong> {event.sampleId}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Client:</strong> {event.clientName}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Technician:</strong> {event.technicianName || 'Unassigned'}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Status:</strong> {event.status}
                      </p>
                    </div>
                  )}

                  {event?.type === 'maintenance' && (
                    <div>
                      <p className="text-sm text-gray-500">
                        <strong>Equipment:</strong> {event.equipmentName}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Technician:</strong> {event.technicianName}
                      </p>
                    </div>
                  )}

                  {event?.type === 'client-visit' && (
                    <div>
                      <p className="text-sm text-gray-500">
                        <strong>Client:</strong> {event.clientName}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Purpose:</strong> {event.purpose}
                      </p>
                    </div>
                  )}

                  <p className="text-sm text-gray-500 mt-2">
                    <strong>Start:</strong>{' '}
                    {event?.start.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>End:</strong>{' '}
                    {event?.end.toLocaleString()}
                  </p>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  {onDelete && (
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  )}
                  {onSave && (
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  )}
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
