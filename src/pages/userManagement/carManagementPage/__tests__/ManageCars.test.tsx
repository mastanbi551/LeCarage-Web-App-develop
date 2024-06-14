import { render, screen } from "@testing-library/react";
import { ManageCars } from "../manageCars/ManageCars";

interface ManageCarsInterfaceProps {
  backButtonHandler: jest.Mock;
  archiveButtonHandler: jest.Mock;
  saveUpdateButtonHandler: jest.Mock;
  carDetailsData: Record<string, unknown>;
  carInfo: {
    carId: string;
    carMakeId: string;
    carModelId: string;
    carColorId: string;
    fkiCarStatusId: string;
    licensePlateNumber: string;
    locationId: string;
    additionalNotes: string;
    photoURL: string;
    stalling: string;
  };
  isDisable: boolean;
  isLoading: boolean;
  onCarMakeValueChange: jest.Mock;
  onCarModelValueChange: jest.Mock;
  onCarColorValueChange: jest.Mock;
  onStatusValueChange: jest.Mock;
  onLocationValueChange: jest.Mock;
  onLicensePlateChange: jest.Mock;
  onNotesChange: jest.Mock;
  onStallingChange: jest.Mock;
}

describe("ManageCars component", () => {
    const props: ManageCarsInterfaceProps = {
        backButtonHandler: jest.fn(),
        archiveButtonHandler: jest.fn(),
        saveUpdateButtonHandler: jest.fn(),
        carDetailsData: {},
        carInfo: {
          carId: "1",
          carMakeId: "1",
          carModelId: "1",
          carColorId: "1",
          fkiCarStatusId: "1",
          licensePlateNumber: "ABC123",
          locationId: "1",
          additionalNotes: "This is a test car",
          photoURL: "https://example.com/car.jpg",
          stalling: "Automatic",
        },
        isDisable: false,
        isLoading: false,
        onCarMakeValueChange: jest.fn(),
        onCarModelValueChange: jest.fn(),
        onCarColorValueChange: jest.fn(),
        onStatusValueChange: jest.fn(),
        onLocationValueChange: jest.fn(),
        onLicensePlateChange: jest.fn(),
        onNotesChange: jest.fn(),
        onStallingChange: jest.fn(),
      };
      
      

  test("renders correctly", () => {
    render(<ManageCars isEditable={false} isCreate={false} statusDropDownData={[]} carMakeInfo={[]} carModelInfo={[]} carColorInfo={[]} warehouseLocationsInfo={[]} {...props} />);
    expect(screen).toMatchSnapshot();
  });
});
