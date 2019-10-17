# This is a practice of mongoose populate

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
