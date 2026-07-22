require("dotenv/config");
const fs = require("fs");
const path = require("path");
const { User, Category, Product } = require("../models");

const SEED_ASSETS = path.resolve(__dirname, "..", "seed-assets");
const UPLOADS = path.resolve(__dirname, "..", "uploads");

function copiarAsset(nomeArquivo) {
  const origem = path.join(SEED_ASSETS, nomeArquivo);
  const destino = path.join(UPLOADS, nomeArquivo);
  fs.copyFileSync(origem, destino);
  return `/uploads/${nomeArquivo}`;
}

async function seed() {
  const adminExiste = await User.findOne({ where: { email: "admin@devburguer.com" } });
  if (!adminExiste) {
    await User.create({
      name: "Admin DevBurguer",
      email: "admin@devburguer.com",
      password: "admin123",
      admin: true,
    });
    console.log("Usuário admin criado: admin@devburguer.com / admin123");
  }

  let categoriaTradicional = await Category.findOne({ where: { name: "Tradicional" } });
  if (!categoriaTradicional) {
    categoriaTradicional = await Category.create({
      name: "Tradicional",
      url: copiarAsset("xbacon.jpg"),
    });
  }

  let categoriaVegano = await Category.findOne({ where: { name: "Vegano" } });
  if (!categoriaVegano) {
    categoriaVegano = await Category.create({
      name: "Vegano",
      url: copiarAsset("xvegan.jpg"),
    });
  }

  const produtos = [
    { name: "X-Salada", price: 22.9, category_id: categoriaTradicional.id, url: copiarAsset("xsalada.jpg"), offer: false },
    { name: "X-Bacon", price: 26.9, category_id: categoriaTradicional.id, url: copiarAsset("xbacon.jpg"), offer: true },
    { name: "Bacon & Egg", price: 28.9, category_id: categoriaTradicional.id, url: copiarAsset("bacon-egg.jpg"), offer: false },
    { name: "Monstruoso", price: 34.9, category_id: categoriaTradicional.id, url: copiarAsset("monstruoso.jpg"), offer: false },
    { name: "X-Vegan", price: 24.9, category_id: categoriaVegano.id, url: copiarAsset("xvegan.jpg"), offer: false },
    { name: "Monstruoso Vegan", price: 32.9, category_id: categoriaVegano.id, url: copiarAsset("monstruoso-vegan.jpg"), offer: true },
  ];

  for (const produto of produtos) {
    const existe = await Product.findOne({ where: { name: produto.name } });
    if (!existe) {
      await Product.create(produto);
    }
  }

  console.log("Seed concluído!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
