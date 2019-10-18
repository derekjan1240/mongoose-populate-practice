# This is a practice of mongoose populate

## Model

1. Machine: machine has many components, each component has one or more vendors.
2. Component: each component has many vendors.
3. Vendor: each vendor has many components.

---

## Data Routes

### Machine

* List Types
  * Machine > MachineComponents
  * Machine > ComponentVendors
  * Machine > Components & ComponentVendors
  * Machine > All Info

* Path
  * /list/machine/:machine/MachineComponents
  * /list/machine/:machine/MachineVendors
  * /list/machine/:machine/MachineComponentsAndVendors
  * /list/machine/:machine/all

### Component

* List Types
  * Component > ComponentVendors
  * Component > All Info

* Path
  * /list/component/:component/ComponentVendors
  * /list/component/:component/all

### Vendor

* List Types
  * Vendor > All Components
  * Vendor > All Info

* Path
  * /list/vendor/:vendor/components
  * /list/vendor/:vendor/all

---

## Page Routes

### Path '/' for testing query (Machine, Component, Vendor)

* Defult Query Type
  * Machine > All  
  * Component > All
  * Vendor > Componts

### Path '/form' for create data

* /form/machine > create machine form
* /form/component > create component form
* /form/vendor > create vendor form

---
