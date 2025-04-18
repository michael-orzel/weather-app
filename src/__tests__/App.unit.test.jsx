import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

global.fetch = jest.fn();

describe('App Unit Tests', () => {

  const mockWeatherData = {
    name: "New York",
    sys: { country: "US" },
    main: { temp: 60 },
    weather: [{ description: "Clear Sky" }],
  };

  beforeEach(() => {
    fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockWeatherData),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays heading text', () => {
    render(<App />);

    const heading = screen.getByText("Weather App");

    expect(heading).toBeInTheDocument();
  });

  it('shows default button rendering', async () => {
    render(<App />);

    const button = screen.getByText("Check Weather");

    expect(button).toBeInTheDocument();
  });

  it('fetches weather for a new city on form submit', async () => {
    render(<App />);

    const newUserInput = "Paris";

    let input = screen.getByPlaceholderText("Enter city name");
    const button = screen.getByText("Check Weather");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    fireEvent.change(input, { target: { value: newUserInput } });
    expect(input).toHaveValue(newUserInput);

    await fireEvent.click(button);

    const city = screen.findByText("Paris, FR");
  });

  it('applies Tailwind CSS to the button', () => {
    render(<App />);

    const button = screen.getByText("Check Weather");

    expect(button).toHaveClass("bg-[#152A66]");
    expect(button).toHaveClass("text-white");
  });

});