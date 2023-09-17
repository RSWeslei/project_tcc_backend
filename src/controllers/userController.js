const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

const signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: 'Dados inválidos',
        data: []
      })
    }
    let emailExists = await User.findOne({
      where: {
        email: email
      }
    })

    if (emailExists) {
      return res.status(500).send({
        success: false,
        message: 'Email ja esta em uso',
        data: []
      })
    }

    let salt = await bcrypt.genSalt(10)
    let passwordHash = await bcrypt.hash(password, salt)

    await User.create({
      name: name,
      email: email,
      passwordHash: passwordHash
    })

    return res.status(200).send({
      success: true,
      message: 'Usuário criado com sucesso',
      data: []
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
      data: []
    })
  }
}

const login = async (req, res) => {
  try {
    let { name, email, password } = req.body
    if ((!name && !email) || !password) {
      return res.status(400).send({
        success: false,
        message: 'Dados inválidos',
        data: []
      })
    }

    let user = {}
    if (name) {
      user = await User.findOne({
        where: {
          name: name
        }
      })
    } else {
      user = await User.findOne({
        where: {
          email: email
        }
      })
    }

    if (!user) {
      return res.status(500).send({
        success: false,
        message: 'Usuário nao encontrado',
        data: []
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash)
    if (!passwordMatch) {
      return res.status(500).send({
        success: false,
        message: 'Senha incorreta',
        data: []
      })
    }

    let token = jwt.sign(
      { idUser: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '10h' }
    );

    user.token = token
    user.save()

    return res.status(200).send({
      type: 'success',
      message: 'Login realizado com sucesso',
      data: {
        token: token
      }
    })

  } catch (error) {
    return res.status(500).send({
      type: 'error',
      message: error.message,
      data: []
    })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({
      success: true,
      data: users,
      message: 'Todos os usuários retornados com sucesso!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: [],
      message: 'Erro ao buscar usuários!',
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Usuário não encontrado',
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
      message: 'Usuário recuperado com sucesso!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Erro ao buscar usuário',
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password_hash, token, name } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Usuário não encontrado',
      });
    }

    user.email = email;
    user.password_hash = password_hash;
    user.token = token;
    user.name = name;

    await user.save();

    return res.status(200).json({
      success: true,
      data: user,
      message: 'Usuário atualizado com sucesso!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Erro ao atualizar usuário',
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Usuário não encontrado',
      });
    }

    await user.destroy();

    return res.status(204).json({
      success: true,
      data: null,
      message: 'Usuário excluído com sucesso!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Erro ao excluir usuário',
    });
  }
};

module.exports = {
  signUp,
  login
};
