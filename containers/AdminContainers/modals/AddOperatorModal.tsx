import React, { Fragment, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

import { useFirestore, useFunctions } from "../../../firebase/firebase";

export interface AddOperatorModalProps {
  modalOpen: boolean;
  onClose?: () => void;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const akOperatorClasses = [
  "Caster",
  "Defender",
  "Guard",
  "Medic",
  "Sniper",
  "Specialist",
  "Supporter",
  "Vanguard",
];

const AddOperatorModal: React.FC<AddOperatorModalProps> = ({
  modalOpen,
  onClose = () => {},
}) => {
  const [selectedOperatorClass, setSelectedOperatorClass] = useState(
    akOperatorClasses[0]
  );
  const [operatorName, setOperatorName] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);

  const functions = useFunctions();

  const setData = () => {
    setIsSubmitting(true);
    const addOperator = functions.httpsCallable("addOperator");
    addOperator({ name: operatorName, class: selectedOperatorClass })
      .then(() => {
        console.log("Success!");
        setIsSubmitting(false);
        setHasErrored(false);
        onClose();
      })
      .catch((err) => {
        console.error(err);
        setIsSubmitting(false);
        setHasErrored(true);
      });
  };

  return (
    <Transition appear show={modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Add Operator
              </Dialog.Title>
              <div className="mt-2">
                This allows you to add opreators to the database, simple type in
                a name and select the operator class.
              </div>
              <div className="mt-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Operator Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={operatorName}
                      onChange={(e) => setOperatorName(e.currentTarget.value)}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Saga (ABBBBBBUUUUURRRRAAAAGGGGGEEEEEE)"
                    />
                  </div>
                </div>
                <Listbox
                  value={selectedOperatorClass}
                  onChange={setSelectedOperatorClass}
                >
                  {({ open }) => {
                    const lowercaseClass =
                      selectedOperatorClass.charAt(0).toLowerCase() +
                      selectedOperatorClass.slice(1);
                    return (
                      <>
                        <Listbox.Label className="block text-sm font-medium text-gray-700">
                          Operator Class
                        </Listbox.Label>
                        <div className="mt-1 relative z-100">
                          <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <span className="flex items-center">
                              <img
                                src={`/images/classes/icon_profession_${lowercaseClass}_large.png`}
                                alt=""
                                className="flex-shrink-0 h-6 w-6 rounded-full"
                              />
                              <span className="ml-3 block truncate">
                                {selectedOperatorClass}
                              </span>
                            </span>
                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <SelectorIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options
                              static
                              className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                            >
                              {akOperatorClasses.map((operatorClass) => {
                                const lowercaseClass =
                                  operatorClass.charAt(0).toLowerCase() +
                                  operatorClass.slice(1);
                                return (
                                  <Listbox.Option
                                    key={operatorClass}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? "text-white bg-indigo-600"
                                          : "text-gray-900",
                                        "cursor-default select-none relative py-2 pl-3 pr-9"
                                      )
                                    }
                                    value={operatorClass}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <div className="flex items-center">
                                          <img
                                            src={`/images/classes/icon_profession_${lowercaseClass}_large.png`}
                                            alt=""
                                            className="flex-shrink-0 h-6 w-6 rounded-full"
                                          />
                                          <span
                                            className={classNames(
                                              selected
                                                ? "font-semibold"
                                                : "font-normal",
                                              "ml-3 block truncate"
                                            )}
                                          >
                                            {operatorClass}
                                          </span>
                                        </div>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? "text-white"
                                                : "text-indigo-600",
                                              "absolute inset-y-0 right-0 flex items-center pr-4"
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                );
                              })}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    );
                  }}
                </Listbox>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={() => {
                    setData();
                  }}
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddOperatorModal;
