import Page from '../models/page';

export async function create(req, res, next) {
  const pageData = req.body;
  const userId = req.user._id;

  pageData.userId = userId;

  try {
    var page = await Page.create(pageData);
  } catch ({ message }) {
    return next({
      status: 400,
      message
    })
  }

  res.json(page);
}

export async function getAll(req, res, next) {
  try {
    var pages = await Page.find({});
  } catch ({ message }) {
    return next({
      status: 500,
      message
    })
  }

  res.json({ pages });
}
