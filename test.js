import unittest
from app import app, calc_engine, calc_storage, calc_overall_total

class TestApp(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def assertAlmostEqualWithTolerance(self, first, second, tolerance, msg=None):
        if not (second - tolerance <= first <= second + tolerance):
            standardMsg = f'{first} != {second} within tolerance {tolerance}'
            self.fail(self._formatMessage(msg, standardMsg))

    def test_calc_engine(self):
        result = calc_engine(10, 5)
        expected = {
            "subproduct1": {
                "cost_without_vat": 100.0,
                "cost_vat_rate": 1.0,
                "cost_incl_vat": 101.0,
                "cost_annual": 1212.0
            }
        }
        tolerance = 0.05  # Set your acceptable variance here
        self.assertAlmostEqualWithTolerance(result["subproduct1"]["cost_without_vat"], expected["subproduct1"]["cost_without_vat"], tolerance)
        self.assertAlmostEqualWithTolerance(result["subproduct1"]["cost_vat_rate"], expected["subproduct1"]["cost_vat_rate"], tolerance)
        self.assertAlmostEqualWithTolerance(result["subproduct1"]["cost_incl_vat"], expected["subproduct1"]["cost_incl_vat"], tolerance)
        self.assertAlmostEqualWithTolerance(result["subproduct1"]["cost_annual"], expected["subproduct1"]["cost_annual"], tolerance)

    def test_calc_storage(self):
        result = calc_storage('medium', 'high')
        expected = {
            "subproduct1": {
                "cost_without_vat": 7.5,
                "cost_vat_rate": 0.15,
                "cost_incl_vat": 7.65,
                "cost_annual": 91.8
            }
        }
        tolerance = 0.05  # Set your acceptable variance here
        self.assertAlmostEqualWithTolerance(result["subproduct1"]["cost_without_vat"], expected["subproduct1"]["cost_without_vat"], tolerance)
        self.assertAlmostEqualWithTolerance(result["subproduct1"]["cost_vat_rate"], expected["subproduct1"]["cost_vat_rate"], tolerance)
        self.assertAlmostEqualWithTolerance(result["subproduct1"]["cost_incl_vat"], expected["subproduct1"]["cost_incl_vat"], tolerance)
        self.assertAlmostEqualWithTolerance(result["subproduct1"]["cost_annual"], expected["subproduct1"]["cost_annual"], tolerance)

    def test_calc_overall_total(self):
        compute_results = {
            "subproduct1": {
                "cost_without_vat": 100.0,
                "cost_vat_rate": 1.0,
                "cost_incl_vat": 101.0,
                "cost_annual": 1212.0
            }
        }
        storage_results = {
            "subproduct1": {
                "cost_without_vat": 7.5,
                "cost_vat_rate": 0.15,
                "cost_incl_vat": 7.65,
                "cost_annual": 91.8
            }
        }
        result = calc_overall_total(compute_results, storage_results)
        expected = {
            "overallTotals": {
                "total_cost_without_vat": 107.5,
                "total_cost_vat_rate": 1.15,
                "total_cost_incl_vat": 108.65,
                "total_cost_annual": 1303.8
            }
        }
        tolerance = 0.05  # Set your acceptable variance here
        self.assertAlmostEqualWithTolerance(result["overallTotals"]["total_cost_without_vat"], expected["overallTotals"]["total_cost_without_vat"], tolerance)
        self.assertAlmostEqualWithTolerance(result["overallTotals"]["total_cost_vat_rate"], expected["overallTotals"]["total_cost_vat_rate"], tolerance)
        self.assertAlmostEqualWithTolerance(result["overallTotals"]["total_cost_incl_vat"], expected["overallTotals"]["total_cost_incl_vat"], tolerance)
        self.assertAlmostEqualWithTolerance(result["overallTotals"]["total_cost_annual"], expected["overallTotals"]["total_cost_annual"], tolerance)

if __name__ == '__main__':
    unittest.main()
