import { auth } from "../middleware/auth";

router.get("/protected-route", auth, (req, res) => {
  // La route n'est accessible qu'avec un token valide
  res.json({ user: req.user });
});
